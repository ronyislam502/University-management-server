import express from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseControllers.getAllCourses
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseControllers.getSingleCourse
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseControllers.deleteCourse
);

router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

router.get(
  "/:courseId/get-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseControllers.getFacultiesWithCourse
);

export const CourseRoutes = router;
