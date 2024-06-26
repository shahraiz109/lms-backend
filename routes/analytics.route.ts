import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { authorizedRole, updateAccessToken } from "../controllers/user.controller";
import { getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from "../controllers/analytics.controller";
const analyticRoute = express.Router();

analyticRoute.get(
  "/get-users-analytics",
  updateAccessToken,
  isAuthenticated,
//   authorizedRole("admin"),
  getUserAnalytics
);

analyticRoute.get(
    "/get-orders-analytics",
    updateAccessToken,
    isAuthenticated,
  //   authorizedRole("admin"),
    getOrdersAnalytics
  );

  analyticRoute.get(
    "/get-courses-analytics",
    updateAccessToken,
    isAuthenticated,
  //   authorizedRole("admin"),
    getCoursesAnalytics
  );

export default analyticRoute;
