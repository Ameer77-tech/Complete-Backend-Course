import express, { urlencoded } from "express";
import userRoute from "./routes/user.route.js";
import logger from "./util/logging.js";

const app = express();
app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use(logger);
app.use("/api/v1/users", userRoute);

app.use((req, res) => {
  res.status(404).json({
    error: "Route Not Found",
  });
});

app.listen(3000, () => console.log("Server Running On Port 3000"));
