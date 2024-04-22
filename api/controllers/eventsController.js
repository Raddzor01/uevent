import Event from "../models/Event.js";
import Company from "../models/Company.js";
import nodemailer from "nodemailer";
import config from "../config.json" assert { type: "json" };
import {ClientError} from "../middleware/error.js";
import Formats from "../models/Formats.js";
import Themes from "../models/Themes.js";

export default class eventsController {
    static async getEvents(req, res) {
        const companyId = req.query.companyId;

        const eventsTable = new Event();

        let eventsArray;
        if(companyId)
            eventsArray = await eventsTable.getAllCompanyEvents(companyId);
        else
            eventsArray = await eventsTable.getAll();

        res.status(200).json({eventsArray});
    }

    static async createEvent(req, res) {
        const { name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id } = req.body;

        const eventsTable = new Event();
        const formatsTable = new Formats();
        const themesTable = new Themes();
        const companiesTable = new Company();

        if(price !== 0) {
            // some payment check shit
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

        res.status(200).json({ eventId: eventId });

    }

    static async updateEvent(req, res) {
        const eventId = Number(req.params.id);
        const { name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id } = req.body;

        const eventsTable = new Event();

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
            const companiesTable = new Company();
            if(!await companiesTable.checkFor("id", company_id))
                throw new ClientError("Unknown company", 404);

            await eventsTable.update(eventId, "company_id", company_id);
        }
        if (format_id) {
            const formatsTable = new Formats();
            if (!await formatsTable.checkFor("id", format_id))
                throw new ClientError("Unknown format", 409);
            await eventsTable.update(eventId, "format_id", format_id);
        }
        if (theme_id) {
            const themesTable = new Themes();
            if (!await themesTable.checkFor("id", theme_id))
                throw new ClientError("Unknown theme", 409);
            await eventsTable.update(eventId, "theme_id", theme_id);
        }

        res.status(201).send();
    }

    static async getEvent(req, res) {
        const eventId = Number(req.params.id);

        const eventsTable = new Event();

        const event = await eventsTable.read(eventId);

        if(!event)
            throw new ClientError('Event not found', 404);

        res.status(200).json({event});
    }

    static async deleteEvent(req, res) {
        const eventId = Number(req.params.id);

        const eventsTable = new Event();

        await eventsTable.delete(eventId);
        res.status(204).send();

    }

    static async updateEventPhoto(req, res) {

        if (!req.files)
            throw new ClientError('Please provide a valid file', 400);

        const eventId = Number(req.params.id);

        const fileExtension = req.files.photo.name.split('.').pop();
        if(fileExtension !== "png" && fileExtension !== "jpg")
            throw new ClientError('Please provide a valid file', 400);

        const eventsTable = new Event();

        const fileName = 'IMG_' + Date.now() + '.' + fileExtension;
        await req.files.photo.mv("public/pics/" + fileName);
        await eventsTable.update(eventId, "picture", fileName);

        res.status(200).send();
    }

    static async deleteEventPhoto(req, res) {
        const eventId = Number(req.params.id);

        const eventsTable = new Event();

        await eventsTable.update(eventId, "picture", "default_avatar.png");

        res.status(204).send();
    }
}
