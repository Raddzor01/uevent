import TokenService from "../utils/tokenService.js";
import Company from "../models/Company.js";
import {ClientError} from "./error.js";

const checkUserCompanyRights = async (req, res, next) => {
    const companyId = req.body.companyId || Number(req.params.id);

    const token = req.cookies.token;
    const { userId } = await TokenService.getData(token);

    const companiesTable = new Company();
    const company = await companiesTable.read(companyId);

    if(!company) return next(new ClientError('The company is not found.', 404));
    if(company.user_id !== userId) return next(new ClientError('Forbidden action', 403));

    next();
};

export {checkUserCompanyRights};