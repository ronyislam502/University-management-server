import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { DepartmentValidations } from "./department.validation";
import { DepartmentControllers } from "./department.constroller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.post(
  "/create-department",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(DepartmentValidations.createDepartmentValidationSchema),
  DepartmentControllers.createDepartment
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  DepartmentControllers.getAllDepartments
);

router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  DepartmentControllers.getSingleDepartment
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(DepartmentValidations.updateDepartmentValidationSchema),
  DepartmentControllers.updateDepartment
);

export const DepartmentRoutes = router;
