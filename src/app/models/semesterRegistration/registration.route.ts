import express from "express";
import { SemesterRegistrationControllers } from "./registration.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidation } from "./registration.validation";

const router = express.Router();

router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get("/", SemesterRegistrationControllers.getAllSemesterRegistrations);

router.get(
  "/:id",
  SemesterRegistrationControllers.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistration
);

router.delete(
  "/:id",
  SemesterRegistrationControllers.deleteSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
