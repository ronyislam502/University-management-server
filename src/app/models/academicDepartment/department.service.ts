import httpStatus from "http-status";
import { AcademicFaculty } from "../academicFaculty/faculty.model";
import { TDepartment } from "./department.interface";
import { AcademicDepartment } from "./department.model";
import AppError from "../../errors/AppError";

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const isExistsAcademicFaculty = await AcademicFaculty.findById(
    payload.academicFaculty
  );

  if (!isExistsAcademicFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Academic Faculty is not found"
    );
  }
  const result = (await AcademicDepartment.create(payload)).populate(
    "academicFaculty"
  );
  return result;
};

const getAllDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate("academicFaculty");
  return result;
};

const getSingleDepartmentFromDB = async (_id: string) => {
  const result =
    await AcademicDepartment.findById(_id).populate("academicFaculty");
  return result;
};

const updateDepartmentFromDB = async (
  _id: string,
  payload: Partial<TDepartment>
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

export const DepartmentServices = {
  createDepartmentIntoDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentFromDB,
};
