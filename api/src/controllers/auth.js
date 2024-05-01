import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import usersTable from "../models/User.js";
import TokenService from "../service/token.js";
import { hashPassword, comparePasswords } from "../service/hash.js";
import { ClientError } from "../middleware/error.js";
import { NODEMAILER_TRANSPORTER } from "../../consts/nodemailer.js";

class authController {

    login = async(req, res) => {
        if (req.cookies.token) {
            jsonwebtoken.verify(req.cookies.token, process.env.JSWT_KEY, (err) => {
                if (err)
                    res.clearCookie("token").sendStatus(401);
            });
        } else {
            const { login, password } = req.body;

            const user = await usersTable.readByLogin(login);

            if (user === -1 || !await comparePasswords(password, user.password))
                throw new ClientError("Invalid login or password", 401);

            if(!user.is_confirmed)
                throw new ClientError("Confirm your account first", 403);


            const token = await TokenService.generate({
                userId: user.id,
                login: user.login,
            });

            res.cookie("token", token).json({
                id: user.id,
                login: user.login,
                full_name: user.full_name,
                email: user.email,
                picture: user.picture
            });
        }
    }

    registration = async(req, res) => {
        const { login, password, email, full_name  } = req.body;

        if (await usersTable.checkFor("login", login))
            throw new ClientError("User exists", 409);

        if (await usersTable.checkFor("email", email))
            throw new ClientError("Email in use", 409);

        await usersTable.create(
            login,
            full_name,
            email,
            await hashPassword(password),
        );

        const token = await TokenService.generate({ email: req.body.email });

        const transporter = nodemailer.createTransport(NODEMAILER_TRANSPORTER);
        await transporter.sendMail({
            to: email,
            subject: "Registration on forum",
            html: `Please click this email to confirm your email: <a href="${process.env.CLIENT_URL}/confirm-email/${token}">Click here</a>`,
        });

        res.sendStatus(200);
    }

    confirmEmail = async(req, res) => {
        const token = req.params.token;
        let email;

        await TokenService.getData(token).then((value) => (email = value.email));

        await usersTable.activateAccount(email);

        res.sendStatus(200);
    }

    logout = async(req, res) => {
        if (req.cookies.token) {
            let id;

            jsonwebtoken.verify(req.cookies.token, process.env.JSWT_KEY, (err, decoded) => {
                if (err)
                    throw new ClientError(err, 500);

                id = decoded.id;
            });

            res.clearCookie("token");
      }

      res.sendStatus(200);
    }

    password_reset = async(req, res) => {
        const token = await TokenService.generate({ email: req.body.email });
        const transporter = nodemailer.createTransport(NODEMAILER_TRANSPORTER);

        const url = `${process.env.CLIENT_URL}/password-reset/${token}`;
        await transporter.sendMail({
            to: req.body.email,
            subject: "Confirm Password Reset",
            html: `<a href="${url}">Please click on this text to confirm your password reset.</a>`,
        });

        res.sendStatus(200);
    }

    set_new_password = async(req, res) => {
        const token = req.params.token;
        let email;

        await TokenService.getData(token).then((value) => (email = value.email));
        const hash = await hashPassword(req.body.password);

        await usersTable.updatePasswordByEmail(email, hash);

        res.sendStatus(200);
    }
}

const controller = new authController();
export default controller;
