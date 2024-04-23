import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import {errorMiddleware} from "./middleware/error.js";
import config from './config.json' assert { type: 'json' };

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization, Set-Cookie",
}));

app.use("/api", router);
app.use(errorMiddleware);

app.use(express.static("public/pics"));

app.listen(config.port, () => {
  console.log(`Server started at https://${config.server_ip}:${config.port}`);
}).on('error', (err) => console.error(err.message));
