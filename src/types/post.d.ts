import { Posts } from "@prisma/client";

export interface IPosts extends Omit<Posts, 'images'> {
    images?: { image: string }[];
}