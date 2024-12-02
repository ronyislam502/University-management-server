import express from "express";
import { SemesterRegistrationControllers } from "./registration.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidation } from "./registration.validation";
import { USER_ROLE } from "../user/user.const";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-semester-registration",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemesterRegistrationControllers.getAllSemesterRegistrations
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemesterRegistrationControllers.getSingleSemesterRegistration
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistration
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemesterRegistrationControllers.deleteSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
