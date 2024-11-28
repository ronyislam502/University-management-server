import { TDepartment } from "./department.interface";
import { AcademicDepartment } from "./department.model";

const createDepartmentIntoDB = async (payload: TDepartment) => {
  const result = await AcademicDepartment.create(payload);
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
