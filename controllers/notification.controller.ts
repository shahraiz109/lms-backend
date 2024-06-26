import NotificationModel from "../models/notification.model";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron"


// grt all notifications -- only for admin

export const getNotification = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {

        const notification = await NotificationModel.find().sort({createdAt: -1});

        res.status(201).json({
            success: true,
            notification
        })
        
    } catch (error:any) {
        return next (new ErrorHandler(error.message, 500))
    }
})

// update notification status -- only for admin

export const updateNotification = CatchAsyncError(async(req:Request, res:Response, next: NextFunction)=>{
    try {

        const notification = await NotificationModel.findById(req.params.id);

        if(!notification){
        return next (new ErrorHandler("Notification not found", 404))
        }else{
            notification.status ? notification.status = 'read' : notification.status;
        }

        await notification.save();

        const notifications = await NotificationModel.find().sort({createdAt: -1});

        res.status(200).json({
            success: true,
            notifications
        })

        
    } catch (error:any) {
        return next (new ErrorHandler(error.message, 500))
        
    }
})


// delete notification only for admin

// firest test with example

// cron.schedule("*/5 * * * * *",function(){
//   console.log("---------");
//   console.log('shahraiz')
// })

// delete notification only for admin

cron.schedule("0 0 0 *  * *", async()=>{
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({status: "read", createdAt:{$lt: thirtyDaysAgo}});
    console.log("Deleted read note")
  })