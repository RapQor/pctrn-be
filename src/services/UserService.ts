import { User } from "@prisma/client";
import db from "../libs/db";

export const getUserProfile = async (userId: number) => {
    const userProfile = await db.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            profile_pic: true,
            bio: true,
            createdAt: true,
            // Add any other fields you want to include in the profile
        }
    });

    if (!userProfile) {
        throw new Error("User not found");
    }

    return userProfile;
};

export const getAllUsers = async (currentUserId: number) => {
    const users = await db.user.findMany({
        where: {
            id: { not: currentUserId } // Exclude the current user
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            profile_pic: true,
            bio: true,
            // Add any other fields you want to include
        }
    });

    return users;
};

export const getCurrentUser = async (userId: number) => {
    const user = await db.user.findUnique({
        where: { id: userId },
        // select: {
        //     id: true,
        //     fullName: true,
        //     username: true,
        //     profile_pic: true,
        //     bio: true,
        //     // Add any other fields you want to include
        // },   
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}

export const updateUserProfile = async (userId: number, updatedData: User) => {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updatedData,
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        profile_pic: true,
        bio: true,
        createdAt: true,
      }
    });
  
    if (!updatedUser) {
      throw new Error("Failed to update user profile");
    }
  
    return updatedUser;
  };

  export const getUserMediaPosts = async (userId: number) => {
    const mediaPosts = await db.posts.findMany({
      where: {
        userId: userId,
        images: {
          some: {} // This ensures we only get posts with images
        }
      },
      select: {
        id: true,
        images: {
          select: {
            image: true
          }
        }
      }
    });
  
    return mediaPosts;
  };
  