import { Request, Response } from "express";
import * as followService from "../services/FollowService";

export const handleFollowUser = async (req: Request, res: Response) => {
    const followerId = res.locals.user.id;
    const { followingId } = req.body;

    if(!followingId){
        return res.status(400).json({ error: "Following ID is required" });
    }
    
    try {
        const result = await followService.followUser(followingId, followerId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in handleFollowUser:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export const handleUnfollowUser = async (req: Request, res: Response) => {
    const followerId = res.locals.user.id;
    const { followingId } = req.body;

    if (!followingId) { 
        return res.status(400).json({ error: "Following ID is required" });
    }

    try {
        const result = await followService.unfollowUser(followingId, followerId);
        if (result) {
            res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            res.status(404).json({ error: "Follow relationship not found" });
        }
    } catch (error) {
        console.error("Error in handleUnfollowUser:", error);
        res.status(500).json({ message: "Server error", error });
    }
}  

export const handleGetFollowers = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const followers = await followService.getFollowers(userId);
        res.json(followers);
    } catch (error) {
        console.error("Error in handleGetFollowers:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export const handleGetFollowing = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const following = await followService.getFollowing(userId);
        res.json(following);
    } catch (error) {
        console.error("Error in handleGetFollowing:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export const handleGetFollowStatus = async (req: Request, res: Response) => {
    const currentUserId = res.locals.user.id;
    const { userIds } = req.body;

    try {
        const followStatus = await followService.getFollowStatus(currentUserId, userIds);
        res.status(200).json(followStatus);
    } catch (error) {
        console.error("Error in handleGetFollowStatus:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export const handleGetFollowersCount = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const followersCount = await followService.getFollowersCount(userId);
        res.json({ followersCount });
    } catch (error) {
        console.error("Error in handleGetFollowersCount:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export const handleGetFollowingCount = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const followingCount = await followService.getFollowingCount(userId);
        res.json({ followingCount });
    } catch (error) {
        console.error("Error in handleGetFollowingCount:", error);
        res.status(500).json({ message: "Server error", error });
    }    
}