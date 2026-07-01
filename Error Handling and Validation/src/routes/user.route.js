import { Router } from "express";
import { registerValidate } from "../middlewares/validate.middlware.js";
import { registerController } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/register", registerValidate, registerController);
// userRoute.post("/login");
// userRoute.get("/profile");
// userRoute.delete("/logout");

export default userRoute;
