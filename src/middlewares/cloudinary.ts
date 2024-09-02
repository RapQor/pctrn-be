import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { NextFunction, Request, Response } from "express";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryFile extends Express.Multer.File {
    buffer: Buffer;
}

export const uploadCloudinary = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("uploading");

    const file: CloudinaryFile = req.file as CloudinaryFile;
    const files: CloudinaryFile[] = req.files as CloudinaryFile[];
    if (!file && !files) {
        return res.status(400).send("No file uploaded");
    }

    if (file) {
        return uploadSingle(file, res, next);
    } else {
        return uploadMultiple(files, res, next);
    }
};

const uploadMultiple = async (
    files: CloudinaryFile[],
    res: Response,
    next: NextFunction
) => {
    try {
        const cloudinaryUrls: string[] = [];
        for (const file of files) {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "PCTRN",
                } as any,
                (
                    err: UploadApiErrorResponse | undefined,
                    result: UploadApiResponse | undefined
                ) => {
                    if (err) {
                        console.error("Cloudinary upload error:", err);
                        return next(err);
                    }
                    if (!result) {
                        console.error("Cloudinary upload error: Result is undefined");
                        return next(new Error("Cloudinary upload result is undefined"));
                    }
                    cloudinaryUrls.push(result.secure_url);

                    if (cloudinaryUrls.length === files.length) {
                        res.locals.images = cloudinaryUrls;
                        next();
                    }
                }
            );
            uploadStream.end(file.buffer);
        }
    } catch (error) {
        console.error("Error in uploadToCloudinary middleware:", error);
        next(error);
    }
};

const uploadSingle = async (
    file: CloudinaryFile,
    res: Response,
    next: NextFunction
) => {
    try {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "PCTRN", // Sesuaikan dengan folder yang kamu inginkan
            } as any,
            (
                err: UploadApiErrorResponse | undefined,
                result: UploadApiResponse | undefined
            ) => {
                if (err) {
                    console.error("Cloudinary upload error:", err);
                    return res.status(500).send("Error uploading image");
                }
                if (!result) {
                    console.error("Cloudinary upload error: Result is undefined");
                    return res.status(500).send("Error uploading image");
                }

                res.locals.image = result.secure_url;
                next();
            }
        );
        uploadStream.end(file.buffer);
    } catch (error) {
        console.log("Error in uploadToCloudinary middleware:", error);
        res.status(500).send("Error uploading image");
    }
};
