import eventsTable from '../models/Event.js';
import companiesTable from '../models/Company.js';
import formatsTable from '../models/Formats.js';
import themesTable from '../models/Themes.js';
import { ClientError } from "../middleware/error.js";
import { saveFile } from '../utils/fileUpload.js';
import stripe from '../service/stripe.js';
import ticketsTable from '../models/Tickets.js';
import { TICKETS_UNLIMITED } from '../../consts/default.js';
import promoCodesTable from '../models/Promo-codes.js';
import { scheduleCompanySubscribersNotification, scheduleEventReminder } from '../service/mailScheduler.js';
import { subscribeToEvent } from '../service/eventSubscription.js';

class eventsController {
     getEvents = async(req, res) => {
        const companyId = req.query.companyId;

        let eventsArray;
        if(companyId)
            eventsArray = await eventsTable.getAllCompanyEvents(companyId);
        else
            eventsArray = await eventsTable.getAll();

        res.status(200).json({ eventsArray });
    }

    createEvent = async(req, res) =>  {
        const { name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id } = req.body;

        if(price !== 0) {
            const company = await companiesTable.read(company_id);

            if(!company)
                throw new ClientError("Company not found", 404);

            if(!company.stripe_id)
                throw new ClientError("Stripe account does not exist or connected", 403);

            const account = await stripe.accounts.retrieve(company.stripe_id);

            if (!account.details_submitted)
                throw new ClientError('Company has not completed their account', 403);

        }

        if (await eventsTable.checkFor("name", name))
            throw new ClientError("Event exists", 409);

        if (!await formatsTable.checkFor("id", format_id))
            throw new ClientError("Unknown format", 404);

        if (!await themesTable.checkFor("id", theme_id))
            throw new ClientError("Unknown theme", 404);

        if(!await companiesTable.checkFor("id", company_id))
            throw new ClientError("Unknown company", 404);

        const eventId = await eventsTable.create(name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id);

        scheduleCompanySubscribersNotification(eventId);
        scheduleEventReminder(new Date(date), eventId);

        res.status(200).json({ eventId });

    }

    updateEvent = async(req, res) => {
        const eventId = Number(req.params.id);
        const { name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id } = req.body;

        if (name) {
            if (await eventsTable.checkFor("name", name))
                throw new ClientError("Event exists", 409);
            await eventsTable.update(eventId, "name", name);
        }
        if (description) await eventsTable.update(eventId, "description", description);
        if (date) await eventsTable.update(eventId, "date", date);
        if (price) await eventsTable.update(eventId, "price", price);
        if (tickets_available) await eventsTable.update(eventId, "tickets_available", tickets_available);
        if (latitude) await eventsTable.update(eventId, "latitude", latitude);
        if (longitude) await eventsTable.update(eventId, "longitude", longitude);
        if (company_id) {
            if(!await companiesTable.checkFor("id", company_id))
                throw new ClientError("Unknown company", 404);

            await eventsTable.update(eventId, "company_id", company_id);
        }
        if (format_id) {
            if (!await formatsTable.checkFor("id", format_id))
                throw new ClientError("Unknown format", 409);
            await eventsTable.update(eventId, "format_id", format_id);
        }
        if (theme_id) {
            if (!await themesTable.checkFor("id", theme_id))
                throw new ClientError("Unknown theme", 409);
            await eventsTable.update(eventId, "theme_id", theme_id);
        }

        res.sendStatus(201);
    }

    getEvent = async(req, res) => {
        const eventId = Number(req.params.id);

        const event = await eventsTable.read(eventId);

        if(!event)
            throw new ClientError('Event not found', 404);

        res.status(200).json({ event });
    }

    deleteEvent = async(req, res) => {
        const eventId = Number(req.params.id);

        await eventsTable.delete(eventId);
        res.sendStatus(204);
    }

    updateEventPhoto = async(req, res) => {
        const eventId = Number(req.params.id);
        const file = req.files;

        if (!file)
            throw new ClientError('Please provide a valid file', 400);

        const fileName = await saveFile(file);
        await eventsTable.update(eventId, "picture", fileName);

        res.sendStatus(200);
    }

    deleteEventPhoto = async(req, res) =>  {
        const eventId = Number(req.params.id);

        await eventsTable.update(eventId, "picture", "default_avatar.png");

        res.sendStatus(204);
    }

    createPayment = async(req, res) => {
        const eventId = Number(req.params.id);
        const user = req.user;
        const { isVisible, promo_code } = req.body;

        const event = await eventsTable.read(eventId);

        if(!event)
            throw new ClientError("Event not found", 404);

        if(!await ticketsTable.checkUserTicket(eventId, user.userId))
            throw new ClientError("You already bought a ticket", 400);

        if(event.tickets_available <= 0 && event.tickets_available !== TICKETS_UNLIMITED)
            throw new ClientError('No tickets available', 403);


        if (event.price === 0) {
            await subscribeToEvent(eventId, user.userId, isVisible);

            return res.json({ url: -1 });
        }

        const stripeId = await companiesTable.checkStripeAccount(event.company_id);

        const discount = promo_code ? await promoCodesTable.getDiscountEventPromoCode(promo_code, eventId) : 0;

        const params = {
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/event/payment/?status=true`,
            cancel_url: `${process.env.CLIENT_URL}/event/payment/?status=false`,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Ticket for the '${event.name}' event`,
                    },
                    unit_amount: Number(event.price) * (100 - discount),
                },
                quantity: 1,
            }],
            customer_email: user.email,
            payment_intent_data: {
                metadata: { eventId, userId: user.userId, isVisible, },
                transfer_data: {
                    destination: stripeId,
                },
            },
        };

        const session = await stripe.checkout.sessions.create(params);

        res.json({ url: session.url });
    }
}

const controller = new eventsController();
export default controller;
