import { User } from "@prisma/client"
import db from "../libs/db"
import { IUserRegister } from "../types/auth"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import ERROR from "../utils/constant/ERROR_LIST"

export const login = async(email: string, password: string) => {

    const existedUser = await db.user.findFirst({
        where: {
            OR: [
                {
                    email: email
                },
                {
                    username: email
                }
            ]
        }
    })

    if (!existedUser) {
        return new Error(ERROR.AUTH_NOT_FOUND)
    }

    const isMatch = await bcrypt.compare(password, existedUser.password)

    if (!isMatch) {
        return new Error(ERROR.AUTH_NOT_FOUND)
    }

    const token = jwt.sign(existedUser, process.env.SECRET_KEY! || "INIADALAHSECRETKEY", {
        expiresIn: "24h"
    });
    
    

    return token
    
}

export const register = async(user: IUserRegister): Promise<User | string> => {

    const existedUser = await db.user.findFirst({
        where: {
            username: user.username
        }
    })

    if (existedUser) {
        throw new Error("Username already exists")
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;
    
    const newUser = await db.user.create({
        data: user
    })
    
    return newUser
    

}


export const logout = async(token: 'token') => {
    localStorage.removeItem('token')
}