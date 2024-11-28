import { StudentServices } from "./student.service";
import sendResponse from "../../utilities/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utilities/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get All Student Successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get single Student successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is deleted successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function next(error: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...data: any[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (message?: any, ...optionalParams: any[]): void;
}) {
  throw new Error("Function not implemented.");
}
