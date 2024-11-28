import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createCourseOffered
);

router.get("/", OfferedCourseControllers.getAllOfferedCourses);

router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

router.delete("/:id", OfferedCourseControllers.deletedOfferedCourse);

export const OfferedCourseRoutes = router;
