import express from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyValidations } from "./faculty.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculty
);

router.get(
  "/:Id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getSingleFaculty
);

router.patch(
  "/:Id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete(
  "/:Id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.deleteFaculty
);

export const FacultyRoutes = router;
