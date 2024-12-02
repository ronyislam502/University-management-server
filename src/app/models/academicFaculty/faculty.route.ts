import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AcademicFacultyValidations } from "./faculty.validation";
import { AcademicFacultyControllers } from "./faculty.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcademicFacultyControllers.getSingleAcademicFaculty
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
