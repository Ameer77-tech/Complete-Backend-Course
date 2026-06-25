import { Router } from "express"
import validate from "../util/user.validate.js"

const userRoute = Router()

userRoute.post("/create",validate, () => {})
userRoute.get("/", () => {})
userRoute.delete("/delete/:id", () => {})
userRoute.get("/user", () => {})
userRoute.put("/update/:id", () => {})
userRoute.delete("/clear", () => {})

export default userRoute