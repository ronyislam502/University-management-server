import express from "express";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidations } from "./admin.validation";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:id", AdminControllers.getSingleAdmin);

router.delete("/:id", AdminControllers.deleteAdmin);

router.patch(
  "/:id",
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin
);

export const AdminRoutes = router;
