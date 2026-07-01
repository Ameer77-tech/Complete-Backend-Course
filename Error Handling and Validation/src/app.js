import express, { urlencoded } from "express";
import cors from "cors";
import env from "./config/env.js";

const app = express();
app.use(
  cors({
    origin: env.CORS_ORIGIN_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(urlencoded({ extended: true }));

export default app;
