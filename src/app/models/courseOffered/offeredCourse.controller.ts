import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";

const createCourseOffered = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course created successfully",
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered courses retrieved successfully",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered courses updated successfully",
    data: result,
  });
});

const deletedOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.deletedOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered courses deleted successfully",
    data: result,
  });
});

export const OfferedCourseControllers = {
  createCourseOffered,
  getAllOfferedCourses,
  updateOfferedCourse,
  deletedOfferedCourse,
};
