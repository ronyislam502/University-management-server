import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { DepartmentServices } from "./department.service";

const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is created successfully",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getAllDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Departments are retrieved successfully",
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentServices.getSingleDepartmentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department is retrieved successfully",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DepartmentServices.updateDepartmentFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department is updated  successfully",
    data: result,
  });
});

export const DepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
};
