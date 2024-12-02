import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.post(
  "/create-offered-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createCourseOffered
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  OfferedCourseControllers.getAllOfferedCourses
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  OfferedCourseControllers.getSingleOfferedCourse
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OfferedCourseControllers.deletedOfferedCourse
);

router.get(
  "/my-offered-courses",
  auth(USER_ROLE.student),
  OfferedCourseControllers.getMyOfferedCourses
);

export const OfferedCourseRoutes = router;
