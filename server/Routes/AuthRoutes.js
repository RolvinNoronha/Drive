import { SignUp, Login } from "../Controllers/authController.js";
import { userVerification } from "../Middlewares/authMiddleware.js";
import { uploadFile } from "../Controllers/uploadController.js";
import { getData } from "../Controllers/getDataController.js";
import multer from "multer";
import express from "express";

const router = express.Router();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

const upload = multer({
    storage: multer.memoryStorage(),
    //fileFilter,
    limits: { fileSize: 1000000000, files: 1}
});



router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/upload", upload.single("file"), uploadFile)
router.get("/getData", getData);

export default router;