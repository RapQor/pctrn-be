import db from "../libs/db";

export const followUser = async (followingId: number, followerId: number) => {
    try {
        const existingFollow = await db.follow.findUnique({
            where: {
                followingId_followerId: {
                    followingId,
                    followerId
                }
            }
        })

        if (existingFollow) {
            return existingFollow;
        }

        return await db.follow.create({
            data: {
                followingId,
                followerId
            }
        });
    } catch (error) {
        console.error("Error in followUser:", error);
        throw error;
    }
}

export const unfollowUser = async (followingId: number, followerId: number) => {
    try {
        return await db.follow.deleteMany({
            where: {
                followingId,
                followerId
            }
        });
    } catch (error) {
        console.error("Error in unfollowUser:", error);
        throw error;
    }
}

export const getFollowers = async (userId: number) => {
    return db.follow.findMany({
        where:{
            followingId: userId
        },
        include: {
            follower: {
                select: {
                    id: true,
                    fullName: true,
                    username: true,
                    profile_pic: true
                }
            }
        }
    })
}

export const getFollowing = async (userId: number) => {
    return db.follow.findMany({
        where:{
            followerId: userId
        },
        include: {
            following: {
                select: {
                    id: true,
                    fullName: true,
                    username: true,
                    profile_pic: true
                }
            }
        }    
    })
}

export const getFollowStatus = async (currentUserId: number, userIds: number[]) => {
    const follows = await db.follow.findMany({
        where: {
            followerId: currentUserId,
            followingId: { in: userIds }
        }
    });

    const followStatus: { [key: number]: boolean } = {};
    userIds.forEach(id => {
        followStatus[id] = follows.some(follow => follow.followingId === id);
    });

    return followStatus;
}

export const getFollowersCount = async (userId: number) => {
    return db.follow.count({
      where: {
        followingId: userId
      }
    });
  }
  
  export const getFollowingCount = async (userId: number) => {
    return db.follow.count({
      where: {
        followerId: userId
      }
    });
  }