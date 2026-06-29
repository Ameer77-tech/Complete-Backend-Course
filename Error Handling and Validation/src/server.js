import express, { urlencoded } from "express";
const server = express();

server.use(express.json());
server.use(urlencoded({ extended: true }));

server.get("/api/v1/health", (req, res) => {
  res.send("<b>Running</b>");
});

export default server;
