import { SemesterNameCodeMapper } from "./semester.const";
import { TSemester } from "./semester.interface";
import { AcademicSemester } from "./semester.model";

const createSemesterIntoDB = async (payload: TSemester) => {
  if (SemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findById(_id);
  return result;
};

const updateSemesterIntoDB = async (
  _id: string,
  payload: Partial<TSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    SemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester code");
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const SemesterServices = {
  createSemesterIntoDB,
  getAllSemesterFromDB,
  getSingleSemesterFromDB,
  updateSemesterIntoDB,
};
