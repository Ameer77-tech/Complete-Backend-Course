import express, { urlencoded } from "express";
import cors from "cors";
import env from "./config/env.js";
import errorMiddlware from "./middlewares/error.middleware.js";
import NotFoundError from "./errors/NotFoundError.js";

const app = express();
app.use(
  cors({
    origin: env.CORS_ORIGIN_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/api/v1/health", (req, res) => {
  return res.status(200).send("Running");
});

app.use((req, res, next) => {
  throw new NotFoundError(`${req.method} Route ${req.url} Not Found`, 404);
});

app.use(errorMiddlware);

export default app;
