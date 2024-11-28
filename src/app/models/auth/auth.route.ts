import express from "express";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signIn",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
