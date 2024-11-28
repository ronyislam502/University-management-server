import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AcademicFacultyServices } from "./faculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty is created successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty was retrieved successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty was retrieved successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
