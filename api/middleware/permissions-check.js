import TokenService from "../utils/tokenService.js";
import { companiesTable } from '../models/Company.js';
import { eventsTable } from '../models/Event.js';
import { ClientError } from "./error.js";

const checkUserCompanyRights = async (req, res, next) => {
    const companyId = req.body.company_id || Number(req.params.id);

    const token = req.cookies.token;
    const { userId } = await TokenService.getData(token);

    const company = await companiesTable.read(companyId);

    if(!company) return next(new ClientError('The company is not found.', 404));
    if(company.user_id !== userId) return next(new ClientError('Forbidden action', 403));

    next();
};

const checkUserEventRights = async (req, res, next) => {
    const eventId = req.body.event_id || Number(req.params.id);

    const token = req.cookies.token;
    const { userId } = await TokenService.getData(token);

    const event = await eventsTable.read(eventId);

    if(!event) return next(new ClientError('The company is not found.', 404));

    const company = await companiesTable.read(event.company_id);

    if(company.user_id !== userId) return next(new ClientError('Forbidden action', 403));

    next();
};
export {checkUserCompanyRights, checkUserEventRights};