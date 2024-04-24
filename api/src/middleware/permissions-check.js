import companiesTable from '../models/Company.js';
import eventsTable from '../models/Event.js';
import TokenService from "../service/token.js";
import { ClientError } from "./error.js";
import promoCodesTable from '../models/Promo-codes.js';
import commentsTable from '../models/Comments.js';

const checkUserCompanyPermissions = async (req, res, next) => {
    const companyId = req.body.company_id || Number(req.params.id);

    const token = req.cookies.token;
    const { userId } = await TokenService.getData(token);

    const company = await companiesTable.read(companyId);

    if(!company) return next(new ClientError('The company is not found.', 404));
    if(company.user_id !== userId) return next(new ClientError('Forbidden action', 403));

    next();
};

const checkUserEventPermissions = async (req, res, next) => {
    const eventId = req.body.event_id || Number(req.params.id);

    const token = req.cookies.token;
    const { userId } = await TokenService.getData(token);

    const event = await eventsTable.read(eventId);

    if(!event) return next(new ClientError('The company is not found.', 404));

    const company = await companiesTable.read(event.company_id);

    if(company.user_id !== userId) return next(new ClientError('Forbidden action', 403));

    next();
};

const checkUserPromoCodePermissions = async(req, res, next) => {
    const promoCodeId = Number(req.params.id);

    const token = req.cookies.token;
    const { userId } = await TokenService.getData(token);

    const promoCode = await promoCodesTable.read(promoCodeId);

    if(!promoCode)
        return next(new ClientError('Promo code not found', 404));

    if(!await promoCodesTable.checkPermission(promoCodeId, userId))
        return next(new ClientError('Forbidden action', 403));

    next();
}

const checkUserCommentPermissions = async (req, res, next) => {
    const commentId = Number(req.params.id);

    const token = req.cookies.token;
    const { userId } = await TokenService.getData(token);

    const comment = await commentsTable.read(commentId);
    if (!comment)
        return next(new ClientError('The comment is not found.', 404));

    if (comment.user_id !== userId)
        return next(new ClientError('Forbidden action', 403));

    next();
};


export { checkUserCompanyPermissions, checkUserEventPermissions, checkUserPromoCodePermissions, checkUserCommentPermissions };