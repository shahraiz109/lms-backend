import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { CreateOrder, getAllOrders } from "../controllers/order.controller";
import { authorizedRole, updateAccessToken } from "../controllers/user.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, CreateOrder);
orderRouter.get(
  "/get-orders",
  updateAccessToken,
  isAuthenticated,
//   authorizedRole("admin"),
  getAllOrders
);

export default orderRouter;
