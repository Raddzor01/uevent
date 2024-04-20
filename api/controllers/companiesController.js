import Company from "../models/Company.js";
import TokenService from "../utils/tokenService.js";
import {ClientError} from "../middleware/error.js";

export default class companiesController {

    static async getAllCompanies(req, res) {
        const token = req.cookies.token;
        const { userId } = await TokenService.getData(token);

        const calendarTable = new Company();
        const rows = await calendarTable.getAllUserCalendars(userId);

        res.status(200).json({
            calendarsArray: rows[0],
        });
    }

    static async getCalendar(req, res) {
        const companyId = Number(req.params.id);

        const calendarsTable = new Company();

        const calendar = await calendarsTable.read(companyId);

        res.status(200).json({
        calendar: calendar,
        });
    }

    static async createCompany(req, res) {
        const { name, email, latitude, longitude } = req.body;
        const token = req.cookies.token;
        const { userId } = await TokenService.getData(token);

        const companiesTable = new Company();

        if (await companiesTable.checkFor("name", name))
            throw new ClientError("Company exists", 409);

        if (await companiesTable.checkFor("email", email))
            throw new ClientError("Email in use", 409);

        const companyId = await companiesTable.create(name, email, latitude, longitude, userId);

        res.status(200).json({
            companyId: companyId,
        });
    }

    static async deleteCompany(req, res) {
        const companyId = Number(req.params.id);

        const companiesTable = new Company();

        await companiesTable.delete(companyId);

        res.status(204).send();
    }

    static async updateCompany(req, res) {
        const companyId = Number(req.params.id);
        const { name, email, latitude, longitude } = req.body;

        const companiesTable = new Company();

        if (name) {
            if (await companiesTable.checkFor("name", name))
                throw new ClientError("Company exists", 409);

            await companiesTable.update(companyId, "name", name);
        }

        if (email) {
            if (await companiesTable.checkFor("email", email))
                throw new ClientError("Email in use", 409);

            await companiesTable.update(companyId, "email", email);
        }

        if(latitude && longitude) {
            await companiesTable.update(companyId, "latitude", latitude);
            await companiesTable.update(companyId, "longitude", longitude);
        }

        res.status(201).send();
    }
}
