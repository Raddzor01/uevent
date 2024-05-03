import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import {errorMiddleware} from "./middleware/error.js";
import { stripeWebhook } from './service/stripe.js';
import { admin, adminRouter } from './admin/app.js';

const app = express();

app.use(admin.options.rootPath, adminRouter);
app.use("/webhook", express.raw({ type: 'application/json' }), stripeWebhook);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({}));
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization, Set-Cookie",
}));

app.use("/api", router);
app.use(errorMiddleware);

app.use(express.static(process.env.FILES_DIR));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started at ${process.env.SERVER_URL}`);
}).on('error', (err) => console.error(err.message));
