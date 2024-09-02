import { createPostSchema } from "../libs/validations/post";
import * as replyService from "../services/ReplyService"
import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import { log } from "console";
import db from "../libs/db";

export const findAll = async (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.post_id);
        console.log('Fetching comments for postId:', postId);
        const comments = await replyService.findAll(postId);
        console.log('Found comments:', comments);
        res.json(comments);
    } catch (error) {
        console.error('Error in findAll:', error);
        errorHandler(res, error as unknown as Error);
    }
};

export const findOne = async (req: Request, res: Response) => {
    const post = await replyService.findOne(+req.params.id);
    res.json(post);
}

export const findAllByUser = async (req: Request, res: Response) => {
    const posts = await replyService.findAllByUser(+req.params.id);
    res.json(posts);
}

export const create = async (req: Request, res: Response) => {
    try {
        await createPostSchema.validateAsync(req.body);

        const postId = parseInt(req.params.post_id);
        const userId = res.locals.user.id;

        const newComment = await replyService.create({
            content: req.body.content,
            userId: userId,
            parentId: postId
        });

        const commentWithAuthor = await db.posts.findUnique({
            where: { id: newComment.id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        profile_pic: true
                    }
                }
            }
        });

        res.json({
            message: "Comment created successfully",
            data: commentWithAuthor
        });
    } catch (error) {
        errorHandler(res, error as Error);
    }
}

export const update = (req: Request, res: Response) => {
    const post = replyService.update(parseInt(req.params.id), req.body);
    res.json(post);
}

export const deletePost = (req: Request, res: Response) => {
    const post = replyService.deletePost(parseInt(req.params.id));
    res.json(post);
}
