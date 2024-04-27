import companiesTable from '../models/Company.js';
import { ClientError } from '../middleware/error.js';
import companySubscriptionsTable from '../models/CompanySubscriptions.js';


class companySubscriptionsController {
	subscribeToCompany = async(req, res) => {

		const company_id = Number(req.params.id);
		const { userId } = req.user;

		const company = await companiesTable.read(company_id);

		if(!company)
			throw new ClientError("Company not found", 404);

		if(await companySubscriptionsTable.checkCompanySubscription(company_id, userId))
			throw new  ClientError("Already subscribed to this company", 400);

		await companySubscriptionsTable.create(userId, company_id);

		res.sendStatus(200);
	}

	unsubscribeToCompany = async(req, res) => {
		const company_id = Number(req.params.id);
		const { userId } = req.user;

		const company = await companiesTable.read(company_id);

		if(!company)
			throw new ClientError("Company not found", 404);

		if(!await companySubscriptionsTable.checkCompanySubscription(company_id, userId))
			throw new  ClientError("Not subscribed to this company", 400);

		await companySubscriptionsTable.delete(userId, company_id);

		res.sendStatus(204);
	}
}

const controller = new companySubscriptionsController();
export default controller;
