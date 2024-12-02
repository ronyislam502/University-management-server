import express from "express";
import { EnrolledCoursesControllers } from "./enrolledCourses.controller";
import { USER_ROLE } from "../user/user.const";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { EnrolledCourseValidations } from "./enrolledCourses.validation";

const router = express.Router();

router.post(
  "/enrolled-course/create-enrolled-course",
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  ),
  EnrolledCoursesControllers.createEnrolledCourse
);

router.patch(
  "/update-enrolled/course-marks",
  auth(USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema
  ),
  EnrolledCoursesControllers.updateEnrolledCourseMarks
);

export const EnrolledCoursesRoutes = router;
