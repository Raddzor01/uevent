import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import config from "../config.json" assert { type: "json" };
import hashPassword from "../utils/hashPassword.js";
import TokenService from "../utils/tokenService.js";
import dbService from "../utils/dbService.js";

export default class authController {
  static async login(req, res) {
      if (req.cookies.token) {
        jsonwebtoken.verify(req.cookies.token, config.jswt.secretKey, (err) => {
          if (err) res.clearCookie("token").status(401).end();
        });
      } else {
        const newUser = new User();
        const data = req.body;

        data.password = await hashPassword(data.password);

        let userId = await newUser.loginDataCheck(data.login, data.password);

        if (userId === -1) {
          res.status(401).send("Invalid login or password");
          return;
        }

        await newUser.read(userId);
        const token = await TokenService.generate({
          userId: newUser.id,
          login: newUser.login,
        });

        res.cookie("token", token);

        res.json({
          msg: "Success",
          user: {
            user_id: newUser.id,
            login: newUser.login,
          },
        });
      }
  }

  static async registration(req, res) {
      const data = req.body;

      if (!data.login || !data.password || !data.email || !data.full_name) {
        res.status(400).end();
        return;
      }

      const userTable = new User();
      if (await userTable.checkFor("login", data.login)) {
        res.status(409).send("User exists");
        return;
      }

      if (await userTable.checkFor("email", data.email)) {
        res.status(409).send("Email in use");
        return;
      }

      data.password = await hashPassword(data.password);

      await userTable.create(
        data.login,
        data.full_name,
        data.email,
        data.password
      );

      const token = await TokenService.generate({ email: req.body.email });
      const transporter = nodemailer.createTransport(config.nodemailer);
      await transporter.sendMail({
        to: data.email,
        subject: "Registration on forum",
        html: `Please click this email to confirm your email: <a href="http://127.0.0.1:8000/confirm-email/${token}">Click here</a>`,
      });
      res.status(200).send("Successful registration");
  }

  static async logout(req, res) {
      if (req.cookies.token) {
        let id;
        jsonwebtoken.verify(req.cookies.token, "securepass", (err, decoded) => {
          if (err) throw err;

          id = decoded.id;
        });
        res.clearCookie("token");
      }
      res.status(200).send("Successful logout");
  }

  static async password_reset(req, res) {
      const token = await TokenService.generate({ email: req.body.email });
      const transporter = nodemailer.createTransport(config.nodemailer);
      const url = `http://127.0.0.1:8000/password-reset/${token}`;
      await transporter.sendMail({
        from: "raddzor.101@gmail.com",
        to: req.body.email,
        subject: "Confirm Password Reset",
        html: `<a href="${url}">Please click on this text to confirm your password reset.</a>`,
      });
      res.status(200).send("Success");
  }

  static async set_new_password(req, res) {
      const token = req.params.confirmToken;
      let email;
      await TokenService.getData(token).then((value) => (email = value.email));
      const hash = await hashPassword(req.body.password);

      const sql = `UPDATE users SET password = ? WHERE email = ? ; `;

      await dbService.makeRequest(sql);

      res.status(200).send("Success");
  }
}
