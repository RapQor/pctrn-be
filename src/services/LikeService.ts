import db from "../libs/db";

export const likePost = async (userId: number, postId: number) => {
  // Check if like already exists
  const existingLike = await db.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingLike) {
    // Like already exists, do nothing
    return existingLike;
  }

  // Create new like
  return await db.like.create({
    data: {
      userId,
      postId,
    },
  });
};

export const unlikePost = async (userId: number, postId: number) => {
  try {
    const existingLike = await db.like.findFirst({
      where: {
        userId: userId,
        postId: postId
      }
    });

    if (!existingLike) {
      return null;
    }

    return await db.like.delete({
      where: {
        id: existingLike.id
      }
    });
  } catch (error) {
    console.error("Error in unlikePost:", error);
    throw error;
  }
};


export const getLikes = async (postId: number) => {
  return await db.like.count({
    where: {
      postId,
    },
  });
};

export const hasUserLikedPost = async (userId: number, postId: number) => {
  const like = await db.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
  return like;
};