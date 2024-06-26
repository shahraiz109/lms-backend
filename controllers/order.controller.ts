import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import CourseModel from "../models/course.model";
import OrderModel,{IOrder} from "../models/order.model";
import NotificationModel from "../models/notification.model";
import userModel from "../models/user.model";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMials";
import { triggerAsyncId } from "async_hooks";
import { getAllOrdersService, newOrder } from "../services/order.service";

// create orer

export const CreateOrder = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        
      const {courseId, payment_info} = req.body as IOrder;

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some((course:any)=> course._id.toString()=== courseId);

      if(courseExistInUser){
        return next(new ErrorHandler("you have already purchased this course", 400))
      }

      const course = await CourseModel.findById(courseId);

      if(!course){
        return next(new ErrorHandler("course not found", 404))
      }

      const data:any = {
        courseId:course._id,
        userId: user?._id,
        payment_info,
      }

      

      const mailData = {
        order: {
            _id: course._id.toString().slice(0,6),
            name: course.name,
            price: course.price,
            data: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day:'numeric'}),
        }
      }

      const html =await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'),{order:mailData})

      try {
        if(user){
          await sendMail({
            email: user.email,
            subject:"Order Confirmation",
            template:"order-confirmation.ejs",
            data: mailData
          })
        }
      } catch (error:any) {
        return next (new ErrorHandler(error.message, 500))
      }

      user?.courses.push(course?._id)

      await user?.save()

       await NotificationModel.create({
        user: user?._id,
        title: "new Order",
        message: `you have new order from ${course?.name}`,
      })

    course.purchased ? course.purchased += 1 : course.purchased;

      await course.save()

      newOrder(data,res,next);

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// get all order

export const getAllOrders = CatchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
  try {
    getAllOrdersService(req, res,next);
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
    
  }
})