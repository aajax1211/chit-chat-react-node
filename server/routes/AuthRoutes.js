import {Router} from "express";
import {
    addProfileImage,
    getUserInfo,
    login,
    removeProfileImage,
    signup,
    updateProfile
} from "../controllers/AuthController.js";
import {verifyToken} from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profiles'); 
    },
    filename: function (req, file, cb) {
        const date = Date.now();
        cb(null, date + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

const authRoutes = Router();
//POST
authRoutes.post("/signup", signup)
authRoutes.post("/login", login)
authRoutes.post("/update-profile", verifyToken, updateProfile)
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage)
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage)

//GET
authRoutes.get("/user-info", verifyToken, getUserInfo)

export default authRoutes