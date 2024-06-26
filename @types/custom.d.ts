import { Request } from "express";
import { IUser } from "../models/user.model";
import { name } from "ejs";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
