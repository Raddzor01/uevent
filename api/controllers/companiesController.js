import Company from "../models/Company.js";
import {ClientError} from "../middleware/error.js";
import stripe from "../utils/stripeService.js";

export default class companiesController {

    static async getCompanies(req, res) {
        const userId = req.query.userId;

        const companiesTable = new Company();

        let calendarsArray;
        if(userId)
            calendarsArray = await companiesTable.getAllUserCompanies(userId);
        else
            calendarsArray = await companiesTable.getAll();

        res.status(200).json({
            calendarsArray,
        });
    }

    static async getCompany(req, res) {
        const companyId = Number(req.params.id);

        const calendarsTable = new Company();

        const calendar = await calendarsTable.read(companyId);

        res.status(200).json({calendar});
    }

    static async createCompany(req, res) {
        const { name, email, latitude, longitude } = req.body;
        const userId = req.user.userId;

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

    static async updateCompanyPhoto(req, res) {

        if (!req.files)
            throw new ClientError('Please provide a valid file', 400);

        const companyId = Number(req.params.id);

        const fileExtension = req.files.photo.name.split('.').pop();
        if(fileExtension !== "png" && fileExtension !== "jpg")
            throw new ClientError('Please provide a valid file', 400);

        const companiesTable = new Company();

        const fileName = 'IMG_' + Date.now() + '.' + fileExtension;
        await req.files.photo.mv("public/pics/" + fileName);
        await companiesTable.update(companyId, "picture_path", fileName);

        res.status(200).send();
    }

    static async deleteCompanyPhoto(req, res) {
        const companyId = Number(req.params.id);

        const companiesTable = new Company();

        await companiesTable.update(companyId, "picture_path", "default_company_avatar.png");

        res.status(204).send();
    }

    static async createStripeAccount(req, res) {
        const companyId = Number(req.params.id);

        const companiesTable = new Company();

        const company = companiesTable.read(companyId);

        if(!company.stripe_id) {
            const stripeAccount = await stripe.accounts.create({
               type: 'express',
               default_currency: 'usd'
            });
            await companiesTable.update(companyId, "stripe_id", stripeAccount.id);
            company.stripe_id = stripeAccount.id;
        }

        const accountLink = await stripe.accountLinks.create({
            account: company.stripe_id,
            refresh_url: "http://127.0.0.1:3000",
            return_url: "http://127.0.0.1:3000",
            type: 'account_onboarding',
        });

        res.status(200).json({ account_url: accountLink.url})

    }

}
