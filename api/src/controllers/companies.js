import companiesTable from "../models/Company.js";
import stripe from "../service/stripe.js";
import { ClientError } from "../middleware/error.js";
import { saveFile } from "../utils/fileUpload.js";

class companiesController {

    getCompanies = async(req, res) =>  {
        const userId = Number(req.query.userId);

        let calendarsArray;
        if(userId)
            calendarsArray = await companiesTable.getAllUserCompanies(userId);
        else
            calendarsArray = await companiesTable.getAll();

        res.status(200).json({
            calendarsArray,
        });
    }

    getCompany = async(req, res) =>  {
        const companyId = Number(req.params.id);

        const company = await companiesTable.read(companyId);

        res.status(200).json({ company });
    }

    createCompany = async(req, res) =>  {
        const { name, email, latitude, longitude } = req.body;
        const userId = req.user.userId;

        if (await companiesTable.checkFor("name", name))
            throw new ClientError("Company exists", 409);

        if (await companiesTable.checkFor("email", email))
            throw new ClientError("Email in use", 409);

        const companyId = await companiesTable.create(name, email, latitude, longitude, userId);

        res.status(200).json({ companyId });
    }

    deleteCompany = async(req, res) =>  {
        const companyId = Number(req.params.id);

        await companiesTable.delete(companyId);

        res.sendStatus(204);
    }

    updateCompany = async(req, res) =>  {
        const companyId = Number(req.params.id);
        const { name, email, latitude, longitude } = req.body;

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

        res.sendStatus(201);
    }

    updateCompanyPhoto = async(req, res) =>  {
        const companyId = Number(req.params.id);
        const file = req.files;

        if (!file)
            throw new ClientError('Please provide a valid file', 400);

        const fileName = await saveFile(file);
        await companiesTable.update(companyId, "picture_path", fileName);

        res.sendStatus(200);
    }

    deleteCompanyPhoto = async(req, res) =>  {
        const companyId = Number(req.params.id);

        await companiesTable.update(companyId, "picture_path", "default_company_avatar.png");

        res.sendStatus(204);
    }

    createStripeAccount = async(req, res) =>  {
        const companyId = Number(req.params.id);

        const company = await companiesTable.read(companyId);

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
            refresh_url: process.env.CLIENT_URL,
            return_url: process.env.CLIENT_URL,
            type: 'account_onboarding',
        });

        res.status(200).json({ account_url: accountLink.url})

    }

    getStripeAccount = async(req, res) => {
        const companyId = Number(req.params.id);

        const company = await companiesTable.read(companyId);

        if(!company)
            throw new ClientError("Company not found", 404);

        if(!company.stripe_id)
            throw new ClientError("Stripe account does not exist or connected", 403);

        const account = await stripe.accounts.retrieve(company.stripe_id);
        if (!account.details_submitted)
            throw new ClientError('Company has not completed their account', 403);

        const link = await stripe.accounts.createLoginLink(company.stripe_id);

        res.json({ url: link.url });
    }
}

const controller = new companiesController();
export default controller;
