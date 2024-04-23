import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import { usersTable } from '../models/User.js';
import { hashPassword, comparePasswords } from "../utils/hashService.js";
import TokenService from "../utils/tokenService.js";
import { ClientError } from '../middleware/error.js';

export default class authController {

    static async login(req, res) {
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

    static async registration(req, res) {
        const data = req.body;

        if (!data.login || !data.password || !data.email || !data.full_name)
            throw new ClientError("Not all data sent",400);

        if (await usersTable.checkFor("login", data.login))
            throw new ClientError("User exists", 409);

        if (await usersTable.checkFor("email", data.email))
            throw new ClientError("Email in use", 409);

        data.password = await hashPassword(data.password);

        await usersTable.create(
            data.login,
            data.full_name,
            data.email,
            data.password
        );

        const token = await TokenService.generate({ email: req.body.email });
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });
        await transporter.sendMail({
            to: data.email,
            subject: "Registration on forum",
            html: `Please click this email to confirm your email: <a href="${process.env.CLIENT_URL}/confirm-email/${token}">Click here</a>`,
        });
        res.sendStatus(200);
    }
    static async logout(req, res) {
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

  static async password_reset(req, res) {
      const token = await TokenService.generate({ email: req.body.email });
      const transporter = nodemailer.createTransport({
          host: process.env.NODEMAILER_HOST,
          port: process.env.NODEMAILER_PORT,
          auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
          }});
      const url = `${process.env.CLIENT_URL}/password-reset/${token}`;
      await transporter.sendMail({
          from: process.env.NODEMAILER_USER,
          to: req.body.email,
          subject: "Confirm Password Reset",
          html: `<a href="${url}">Please click on this text to confirm your password reset.</a>`,
      });
      res.sendStatus(200);
  }

  static async set_new_password(req, res) {
      const token = req.params.confirmToken;
      let email;
      await TokenService.getData(token).then((value) => (email = value.email));
      const hash = await hashPassword(req.body.password);

      await usersTable.updatePasswordByEmail(email, hash);

      res.sendStatus(200);
  }
}
