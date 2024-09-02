import { Request, Response } from "express";
import * as userService from "../services/UserService";
import errorHandler from "../utils/errorHandler";
import db from "../libs/db";


export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.id;
        const userProfile = await userService.getUserProfile(userId);
        res.json({
            message: "User profile retrieved successfully",
            data: userProfile
        });
    } catch (error) {
        errorHandler(res, error as Error);
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const currentUserId = res.locals.user.id;
        const users = await userService.getAllUsers(currentUserId);
        res.json({
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        errorHandler(res, error as Error);
    }
};

export const searchUsers = async (req: Request, res: Response) => {
    try {
      const { term } = req.query;
      const currentUserId = res.locals.user.id;
  
      if (typeof term !== 'string') {
        return res.status(400).json({ message: 'Invalid search term' });
      }
  
      const users = await db.user.findMany({
        where: {
          AND: [
            {
              OR: [
                { fullName: { contains: term, mode: 'insensitive' } },
                { username: { contains: term, mode: 'insensitive' } }
              ]
            },
            { id: { not: currentUserId } }
          ]
        },
        select: {
          id: true,
          fullName: true,
          username: true,
          profile_pic: true
        },
        take: 10 // Limit results to 10
      });
  
      res.json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getCurrentUser = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user.id;
      const user = await userService.getCurrentUser(userId);
      res.json({
        message: "User retrieved successfully",
        data: user
      });
    } catch (error) {
      errorHandler(res, error as Error);
    }
  };

  export const updateUserProfile = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user.id;
      if(req.file){
        req.body.profile_pic = req.file.filename
      }
      const updatedProfile = await userService.updateUserProfile(userId, req.body);
      res.json({
        message: "User profile updated successfully",
        data: updatedProfile
      });
    } catch (error) {
      errorHandler(res, error as Error);
    }
  };

  export const getUserMedia = async (req: Request, res: Response) => {
    try {
      const userId = res.locals.user.id;
      const mediaPosts = await userService.getUserMediaPosts(userId);
      res.json(mediaPosts);
    } catch (error) {
      errorHandler(res, error as Error);
    }
  };