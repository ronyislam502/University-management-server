import express from "express";

import { SemesterControllers } from "./semester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterValidations } from "./semester.validation";

const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(SemesterValidations.createSemesterValidationSchema),
  SemesterControllers.createSemester
);

router.get("/", SemesterControllers.getAllSemesters);

router.get("/:semesterId", SemesterControllers.getSingleSemester);

router.patch(
  "/:semesterId",
  validateRequest(SemesterValidations.updateSemesterValidationSchema),
  SemesterControllers.updateSemester
);

export const SemesterRoutes = router;
