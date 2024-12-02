import express from "express";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "./admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getAllAdmin
);

router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getSingleAdmin
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.deleteAdmin
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin),
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin
);

export const AdminRoutes = router;
