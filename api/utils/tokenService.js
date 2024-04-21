import jsonwebtoken from "jsonwebtoken";
import config from "../config.json" assert { type: 'json' };
import {ClientError} from "../middleware/error.js";
export default class TokenService {

    static async generate(payload) {
        return jsonwebtoken.sign(payload, config.jswt.secretKey, {expiresIn: config.jswt.tokenLife});
    }

    static async authCheck(req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                new ClientError('The access token is invalid or has expired.', 401);
            }

            jsonwebtoken.verify(token, config.jswt.secretKey, (err, decoded) => {
                if (err)
                    throw new ClientError('The access token is invalid or has expired.', 401);

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
        jsonwebtoken.verify(token, config.jswt.secretKey, (err, decoded) => {
            if (err)
                return false;

            data = decoded;
        });
        return data;
    }
}
