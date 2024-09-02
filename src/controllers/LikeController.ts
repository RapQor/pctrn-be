import { Request, Response } from "express";
import * as likeService from "../services/LikeService";
import errorHandler from "../utils/errorHandler";

export const likePost = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.id);
    await likeService.likePost(userId, postId);
    res.json({ message: "Post liked successfully" });
  } catch (error) {
    errorHandler(res, error as Error);
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.id);
    const result = await likeService.unlikePost(userId, postId);
    if (result === null) {
      res.status(404).json({ message: "Like not found or you're not authorized to unlike this post" });
    } else {
      res.json({ message: "Post unliked successfully" });
    }
  } catch (error) {
    errorHandler(res, error as Error);
  }
};

export const getLikes = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const likes = await likeService.getLikes(postId);
    res.json({ likes });
  } catch (error) {
    errorHandler(res, error as Error);
  }
};

export const checkUserLike = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const postId = parseInt(req.params.id);
    const hasLiked = await likeService.hasUserLikedPost(userId, postId);
    res.json({ hasLiked: !!hasLiked });
  } catch (error) {
    errorHandler(res, error as Error);
  }
};