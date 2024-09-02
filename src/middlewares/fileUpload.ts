import multer from "multer";

// Menggunakan memory storage agar file disimpan di memori sebelum diunggah ke Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
