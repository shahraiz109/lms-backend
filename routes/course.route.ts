import express from "express";
import {
  addAnswer,
  addQuestion,
  addReview,
  addReviewReply,
  deleteCourse,
  editCourse,
  generateVedioUrl,
  getAllCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAuthenticated } from "../middleware/auth";
import { authorizedRole, updateAccessToken } from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  // authorizedRole("admin"),
  uploadCourse
);

courseRouter.put("/edit-course/:id",updateAccessToken, isAuthenticated, editCourse);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourse);

courseRouter.get("/get-course-content/:id",updateAccessToken, isAuthenticated, getCourseByUser);

courseRouter.put("/add-question",updateAccessToken, isAuthenticated, addQuestion);

courseRouter.put("/add-answer",updateAccessToken, isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id",updateAccessToken, isAuthenticated, addReview);

courseRouter.put(
  "/add-reply-review",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  addReviewReply
);

courseRouter.get(
  "/get-courses",
  updateAccessToken,
  isAuthenticated,
  // authorizedRole("admin"),
  getAllCourses
);

courseRouter.post(
  "/getVdocipherOTP",
  generateVedioUrl,
);

courseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  // authorizedRole("admin"),
  deleteCourse
);

export default courseRouter;
