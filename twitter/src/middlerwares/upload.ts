import multer from "multer";
import path from "path";
import fs from "fs";

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";

        if (file.fieldname === "profile_pic") {
            folder = "profile";
        } else if (file.fieldname === "cover_pic") {
            folder = "cover";
        }

        // ✅ Correct absolute path inside your project
        const uploadPath = path.join(
            __dirname,
            "../public/uploads",
            folder
        );

        // ✅ Ensure folder exists
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

export const upload = multer({ storage });