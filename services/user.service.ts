import { Response } from "express"
import userModel from "../models/user.model"
import { redis } from "../utils/redis"
import { CatchAsyncError } from "../middleware/catchAsyncError"

// get user by id

export const getUserById = async(id: string, res:Response) =>{

    const userJson = await redis.get(id)
    if(userJson){
        res.status(201).json({
            success: true,
            userJson,
        })
    }
   

}

// get all users

export const getAllUsersService = CatchAsyncError(async(res:Response)=>{
    const users = await userModel.find().sort({createdAt:-1})

    res.status(201).json({
        success: true,
        users
    })
})

// update user role

export const updateUserRoleService = async(res:Response, id: string, role:string)=>{
    const user = await userModel.findByIdAndUpdate(id, {role}, {new: true})

    res.status(201).json({
        success: true,
        user
    })
}