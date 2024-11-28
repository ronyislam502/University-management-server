import express from "express";
import { UserControllers } from "./user.controller";

import { StudentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import { FacultyValidations } from "../faculty/faculty.validation";

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

export const UserRoutes = router;
