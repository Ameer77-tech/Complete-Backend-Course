import express, { urlencoded } from "express";
import NotFoundError from "./errors/NotFoundError.js";
import errorMiddleware from "./middlewares/error.middleware.js";
const server = express();

server.use(express.json());
server.use(urlencoded({ extended: true }));

server.get("/api/v1/health", (req, res) => {
  res.send("<b>Running</b>");
});

server.use((req, res, next) => {
  next(new NotFoundError("Route Not Found"));
});

server.use(errorMiddleware);

export default server;
