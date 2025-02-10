import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFile } from "../controllers/MessageController.js";
import  multer  from 'multer';

export const messagesRoutes = Router()
const upload = multer({dist : "uploads/files"})
messagesRoutes.post("/get-messages", verifyToken, getMessages)

messagesRoutes.post("/upload-file", verifyToken, upload.single("file"),uploadFile)