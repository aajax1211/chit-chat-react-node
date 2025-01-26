import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();
//POST
authRoutes.post("/signup", signup)
authRoutes.post("/login", login)

//GET
authRoutes.get("/user-info",verifyToken, getUserInfo)

export default  authRoutes