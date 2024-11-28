import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AcademicFacultyValidations } from "./faculty.validation";
import { AcademicFacultyControllers } from "./faculty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  AcademicFacultyControllers.createAcademicFaculty
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

router.get("/:id", AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  "/:id",
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
