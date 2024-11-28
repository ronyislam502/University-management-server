import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { FacultyServices } from "./faculty.service";

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultyIntoDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all faculty is successfully",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await FacultyServices.getSingleFacultyIntoDB(Id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get faculty is successfully",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyFromDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(Id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "faculty is deleted successfully",
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
