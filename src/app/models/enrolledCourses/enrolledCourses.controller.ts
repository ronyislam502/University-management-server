import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { EnrolledCoursesServices } from "./enrolledCourses.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCoursesServices.createEnrolledCourseIntoDB(
    userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is enrolled successfully",
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.facultyId;
  const result = await EnrolledCoursesServices.createEnrolledCourseIntoDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Marks updated successfully",
    data: result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.studentId;
  const result = await EnrolledCoursesServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Marks updated successfully",
    meta: result.meta,
    data: result.result,
  });
});

export const EnrolledCoursesControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getMyEnrolledCourses,
};
