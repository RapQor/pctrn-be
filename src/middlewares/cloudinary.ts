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

    const image: CloudinaryFile = req.file as CloudinaryFile;

    console.log("ini image= ", image);
    
    
    const images: CloudinaryFile[] = req.files as CloudinaryFile[];
    if (!image && !images) {
        return res.status(400).send("No file uploaded");
    }

    if (image) {
        return uploadSingle(image, res, next);
    } else {
        return uploadMultiple(images, res, next);
    }
    
};

const uploadMultiple = async (
    images: CloudinaryFile[],
    res: Response,
    next: NextFunction
) => {
    try {
        const cloudinaryUrls: string[] = [];
        for (const image of images) {
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

                    if (cloudinaryUrls.length === images.length) {
                        res.locals.images = cloudinaryUrls;
                        next();
                    }
                }
            );
            uploadStream.end(image.buffer);
        }
    } catch (error) {
        console.error("Error in uploadToCloudinary middleware:", error);
        next(error);
    }
};

const uploadSingle = async (
    image: CloudinaryFile,
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
        uploadStream.end(image.buffer);
    } catch (error) {
        console.log("Error in uploadToCloudinary middleware:", error);
        res.status(500).send("Error uploading image");
    }
};
