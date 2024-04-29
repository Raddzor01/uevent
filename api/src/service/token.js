import jsonwebtoken from "jsonwebtoken";
import { ClientError } from "../middleware/error.js";
import { COOKIE_OPTIONS } from '../../consts/default.js';

export default class TokenService {

    static async generate(payload) {
        return jsonwebtoken.sign(payload, process.env.JSWT_KEY, COOKIE_OPTIONS);
    }

    static async authCheck(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                new ClientError('The access token is invalid or has expired', 401);
            }

            jsonwebtoken.verify(token, process.env.JSWT_KEY, (err, decoded) => {
                if (err) {
                    res.clearCookie("token");
                    throw new ClientError('The access token is invalid or has expired', 401);
                }

                req.user = decoded;
            });

            next();
        } catch (err) {
            return next(err);
        }
    }

    static async getData(token) {
        let data;
        if (!token)
            return false;
        jsonwebtoken.verify(token, process.env.JSWT_KEY, (err, decoded) => {
            if (err)
                throw new ClientError('The access token is invalid or has expired.', 401);

            data = decoded;
        });
        return data;
    }
}
