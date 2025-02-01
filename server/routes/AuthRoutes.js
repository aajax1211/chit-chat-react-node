import {Router} from "express";
import {
    addProfileImage,
    getUserInfo,
    login,
    logout,
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
        const fileExtension = path.extname(file.originalname); // Get file extension
        const baseName = path.basename(file.originalname, fileExtension);
        console.log("basename",baseName) // Get filename without extension
        const encodedFilename = baseName.replace(/\s/g, '%20');
        console.log("encodedfilename",encodedFilename) // Replace spaces with %20
        const date = Date.now();
        cb(null, `${encodedFilename}_${date}${fileExtension}`);
    }
});

const upload = multer({storage: storage});

const authRoutes = Router();
//POST
authRoutes.post("/signup", signup)
authRoutes.post("/login", login)
authRoutes.post("/update-profile", verifyToken, updateProfile)
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage)
authRoutes.post("/logout",logout)

//Delete
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage)

//GET
authRoutes.get("/user-info", verifyToken, getUserInfo)

export default authRoutes