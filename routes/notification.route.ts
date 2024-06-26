import express from "express";
import { getNotification, updateNotification } from "../controllers/notification.controller";
import { isAuthenticated } from "../middleware/auth";
import { authorizedRole, updateAccessToken } from "../controllers/user.controller";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notification",
  updateAccessToken,
  isAuthenticated,
//   authorizedRole("admin"),
  getNotification
);

notificationRoute.put(
    "/update-notification/:id",
    updateAccessToken,
    isAuthenticated,
  //   authorizedRole("admin"),
    updateNotification
  );

export default notificationRoute;
