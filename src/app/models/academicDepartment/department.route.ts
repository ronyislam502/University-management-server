import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { DepartmentValidations } from "./department.validation";
import { DepartmentControllers } from "./department.constroller";

const router = express.Router();

router.post(
  "/create-department",
  validateRequest(DepartmentValidations.createDepartmentValidationSchema),
  DepartmentControllers.createDepartment
);

router.get("/", DepartmentControllers.getAllDepartments);

router.get("/:id", DepartmentControllers.getSingleDepartment);

router.patch(
  "/:id",
  validateRequest(DepartmentValidations.updateDepartmentValidationSchema),
  DepartmentControllers.updateDepartment
);

export const DepartmentRoutes = router;
