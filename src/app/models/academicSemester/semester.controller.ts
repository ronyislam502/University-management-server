import httpStatus from "http-status";

import sendResponse from "../../utilities/sendResponse";
import catchAsync from "../../utilities/catchAsync";
import { SemesterServices } from "./semester.service";

const createSemester = catchAsync(async (req, res) => {
  const result = await SemesterServices.createSemesterIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is created successfully",
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req, res) => {
  const result = await SemesterServices.getAllSemesterFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await SemesterServices.getSingleSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is retrieved successfully",
    data: result,
  });
});

const updateSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await SemesterServices.updateSemesterIntoDB(
    semesterId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester is update successfully",
    data: result,
  });
});

export const SemesterControllers = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
