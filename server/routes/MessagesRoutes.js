import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessageController.js";

export const messagesRoutes = Router()

messagesRoutes.post("/get-messages", verifyToken, getMessages)