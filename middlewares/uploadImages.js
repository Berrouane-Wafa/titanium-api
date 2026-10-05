const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");


//__dirname points to your middlewares/ directory,
//  .. takes us up to the project root. Then path.join() adds uploads/products.
const uploadDir = path.join(__dirname, "..", "uploads", "products");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination : (req,file,callback)=>{
        callback(null,uploadDir)
    },
    filename : (req,file,callback)=>{
        const uniqueName = `${crypto.randomUUID()}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    },

})
const fileFilter = (req,file,callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Only JPEG, PNG and WebP images are allowed"));
    }
}
const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits: {
        fileSize: 5242880,
        files: 5
    }
})

module.exports = upload;