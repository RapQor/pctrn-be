import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import { Posts } from "@prisma/client";
import { IPosts } from "../types/post";

const posts: PostModels[] = [
    
]

export const findAll = async(parentId: number) => { 
    return await db.posts.findMany({
        where: { parentId: parentId },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    profile_pic: true
                }
            },
            _count: {
                select: {
                    comment: true,
                    likes: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export const findOne = async(id: number) => {
    return await db.posts.findFirst({
        where: {id: id},
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    profile_pic: true
                }
            }
        }
    })
}

export const findAllByUser = async(userId: number) => {
    return await db.posts.findMany({
        where: { userId: userId },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    profile_pic: true
                }
            },
            _count: {
                select: {
                    comment: true,
                    likes: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const create = async (data: {
    content: string;
    userId: number;
    parentId: number;
  }): Promise<Posts> => {
    return await db.posts.create({
      data: {
        content: data.content,
        userId: data.userId,
        parentId: data.parentId,
      },
    });
};

export const update = async (id: number, post: IPosts) => {
    const updatePost = await db.posts.update({
        data: {
            ...post,
            images: {
                create: post.images && post.images.map((image) => ({ image: image.filename })),
            }
        },
        where: {id}
    })
    return updatePost
}

export const deletePost = async (id: number) => {
    await db.posts.delete({where: {id}})

    return "deleted";
}