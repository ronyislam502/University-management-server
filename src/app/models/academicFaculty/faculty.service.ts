import { TAcademicFaculty } from "./faculty.interface";
import { AcademicFaculty } from "./faculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findById(_id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  _id: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
