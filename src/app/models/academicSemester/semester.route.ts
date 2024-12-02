import express from "express";

import { SemesterControllers } from "./semester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterValidations } from "./semester.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.post(
  "/create-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(SemesterValidations.createSemesterValidationSchema),
  SemesterControllers.createSemester
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemesterControllers.getAllSemesters
);

router.get(
  "/:semesterId",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemesterControllers.getSingleSemester
);

router.patch(
  "/:semesterId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(SemesterValidations.updateSemesterValidationSchema),
  SemesterControllers.updateSemester
);

export const SemesterRoutes = router;
