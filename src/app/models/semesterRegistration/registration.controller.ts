import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { SemesterRegistrationServices } from "./registration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration is successful!",
    data: result,
  });
});

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration are retrieved successful!",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration is retrieved successful!",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration is updated successfully!",
    data: result,
  });
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration is deleted successfully!",
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
