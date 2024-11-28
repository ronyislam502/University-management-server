import express from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyValidations } from "./faculty.validation";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);

router.get("/:Id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:Id",
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:Id", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
