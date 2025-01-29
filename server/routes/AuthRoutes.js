import { Router } from "express";
import { addProfileImage, getUserInfo, login, signup, updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();
//POST
authRoutes.post("/signup", signup)
authRoutes.post("/login", login)
authRoutes.post("/update-profile",verifyToken, updateProfile)
authRoutes.post ("/add-profile-image",verifyToken,addProfileImage)

//GET
authRoutes.get("/user-info",verifyToken, getUserInfo)

export default  authRoutes