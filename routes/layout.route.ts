import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { authorizedRole, updateAccessToken } from "../controllers/user.controller";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
const layoutRoute = express.Router();

layoutRoute.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
//   authorizedRole("admin"),
  createLayout
);

layoutRoute.put(
    "/edit-layout",
    updateAccessToken,
    isAuthenticated,
  //   authorizedRole("admin"),
    editLayout
  );

  layoutRoute.get(
    "/get-layout",
    getLayoutByType
  );

export default layoutRoute;
