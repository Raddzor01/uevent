import Event from "../models/Event.js";
import TokenService from "../utils/tokenService.js";
import Company from "../models/Company.js";
import nodemailer from "nodemailer";
import config from "../config.json" assert { type: "json" };
import User from "../models/User.js";
import {ClientError} from "../middleware/error.js";

export default class eventsController {
    static async getAllCompanyEvents(req, res) {
        const companyId = Number(req.params.id);

        const eventsTable = new Event();

        const events = await eventsTable.getAllCompanyEvents(companyId);

        res.status(200).json({
            eventsArray: events,
        });
    }

    static async createEvent(req, res) {
        const { name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id } = req.body;

        if(price !== 0) {
            // some payment check shit
        }

        const token = req.cookies.token;
        const { userId } = await TokenService.getData(token);

        const companiesTable = new Company();
        const eventsTable = new Event();

        if (!(await companiesTable.checkPermission(company_id, userId)))
            throw new ClientError('Forbidden action', 403);

        const eventId = await eventsTable.create(name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id);

        res.status(200).json({ eventId: eventId });

    }

    static async updateEvent(req, res) {
        const eventId = Number(req.params.id);
        const { name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id } = req.body;

        const token = req.cookies.token;
        const { userId } = await TokenService.getData(token);

        const companiesTable = new Company();
        const eventsTable = new Event();

        if (!(await companiesTable.checkPermission(company_id, userId)))
            throw new ClientError('Forbidden action', 403);

        if (name) await eventsTable.update(eventId, "name", name);
        if (description) await eventsTable.update(eventId, "description", description);
        if (date) await eventsTable.update(eventId, "date", date);
        if (price) await eventsTable.update(eventId, "price", price);
        if (tickets_available) await eventsTable.update(eventId, "tickets_available", tickets_available);
        if (latitude) await eventsTable.update(eventId, "latitude", latitude);
        if (longitude) await eventsTable.update(eventId, "longitude", longitude);
        if (company_id) await eventsTable.update(eventId, "company_id", company_id);
        if (format_id) await eventsTable.update(eventId, "format_id", format_id);
        if (theme_id) await eventsTable.update(eventId, "theme_id", theme_id);

        res.status(201).send();
    }

    static async getEvent(req, res) {
        const eventId = Number(req.params.id);

        const eventsTable = new Event();

        const event = await eventsTable.read(eventId);

        res.status(200).json({
            event: event,
        });
    }

    static async deleteEvent(req, res) {
        const eventId = Number(req.params.id);

        const eventsTable = new Event();

        await eventsTable.delete(eventId);
        res.status(204).send();

    }
}
