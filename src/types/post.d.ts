import { Posts } from "@prisma/client";

export interface IPosts extends Omit<Posts, 'image'> {
    images?: { image: string }[];
}