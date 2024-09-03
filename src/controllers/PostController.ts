import { createPostSchema } from "../libs/validations/post";
import * as postService from "../services/PostService"
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import { log } from "console";
import { IPosts } from "../types/post";

type TFiles = Express.Multer.File[];

export const findAll = async (req: Request, res: Response) => {
    const posts = await postService.findAll(+req.params.id);
    res.json(posts);
};

export const findOne = async (req: Request, res: Response) => {
    const post = await postService.findOne(+req.params.id);
    res.json(post);
}

export const findAllByUser = async (req: Request, res: Response) => {
    const posts = await postService.findAllByUser(+req.params.id);
    res.json(posts);
}

export const create = async (req: Request, res: Response) => {
    try {
        // Validasi data input menggunakan Joi atau skema validasi lainnya

        await createPostSchema.validateAsync(req.body);
        
        const userId = res.locals.user.id;
        req.body.userId = userId;

        const image = res.locals.image;
        console.log(req.body.image);

        const postData: IPosts = {
            ...req.body,
            userId,
            images: image ? [{ image: image }] : undefined
        };

        const post = await postService.create(postData);
        res.send({
            message: "Post created successfully",
            data: post
        });
        console.log("ini image di controller= ", image);
        

        
    } catch (error) {
        // Menangani error dan mengembalikan respons error
        errorHandler(res, error as unknown as Error);
        console.log(error);
        
    }
};

export const update = (req: Request, res: Response) => {
    const post = postService.update(parseInt(req.params.id), req.body);
    res.json(post);
}

export const deletePost = (req: Request, res: Response) => {
    const post = postService.deletePost(parseInt(req.params.id));
    res.json(post);
}
