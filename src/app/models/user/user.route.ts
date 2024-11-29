import express from "express";
import { UserControllers } from "./user.controller";

import { StudentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import { FacultyValidations } from "../faculty/faculty.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.const";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(StudentValidations.CreateStudentValidationSchema),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);

router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus
);

export const UserRoutes = router;
