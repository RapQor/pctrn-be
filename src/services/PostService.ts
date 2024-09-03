import { PostModels } from "../models/PostModels";
import db from "../libs/db";
import {IPosts } from "../types/post";


const posts: PostModels[] = [
    
]

export const findAll = async(postId: number) => { 
    return await db.posts.findMany({
        orderBy: {
            createdAt: 'desc', // Order by `createdAt` in descending order (newest first)
        },
        include: {
            author: {
                select: {
                    id: true,
                    fullName: true,
                    username: true,
                    profile_pic: true
                }
            },
            _count: {
                select: {
                    comment: true,
                    likes: true
                }
            },
            images: {
                select: {
                    image: true
                }
            }
        },
        where: {
            parentId: postId
        }
    })
}

export const findOne = async(id: number) => {
    return await db.posts.findFirst({
        where: {id: id},
        include: {
            author: {
                select: {
                    id: true,
                    fullName: true,
                    username: true,
                    profile_pic: true
                },
            },
            _count: {
                select: {
                    comment: true,
                    likes: true
                }
            },
            images: {
                select: {
                    image: true
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};

export const findAllByUser = async(userId: number) => {
    return await db.posts.findMany({
        where: {userId: userId},
        include: {
            author: {
                select: {
                    id: true,
                    fullName: true,
                    username: true,
                    profile_pic: true
                }
            },
            _count: {
                select: {
                    comment: true,
                    likes: true
                }
            },
            images: {
                select: {
                    image: true
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export const create = async (post: IPosts) => {
    console.log("post=", post);
    
    const newPost = await db.posts.create({
        data: {
            ...post,
            images: {
                create: post.images?.map(img => ({ image: img.image })) || []
            }
        },
        include: {
            images: true,
            author: {
                select: {
                    id: true,
                    fullName: true,
                    username: true,
                    profile_pic: true
                }
            }
        }
    });
    
    return newPost;
}

export const update = async (id: number, post: IPosts) => {
    const updatePost = await db.posts.update({
        data: {
            ...post,
            images: {
                create: post.images?.map(img => ({ image: img.image })) || []
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

