import { Router } from "express";
import validate, { update } from "../util/user.validate.js";
import {
  createUserController,
  getAllUsers,
  getAUser,
  removeUser,
  updateAUser,
} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post("/create", validate, createUserController);
userRoute.get("/", getAllUsers);
userRoute.delete("/delete/:id", removeUser);
userRoute.get("/user/:id", getAUser);
userRoute.put("/update/:id", update, updateAUser);
userRoute.delete("/clear", () => {});

export default userRoute;
