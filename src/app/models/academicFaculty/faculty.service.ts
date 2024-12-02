import QueryBuilder from "../../builder/queryBuilder";
import { AcademicFacultySearchableFields } from "./faculty.const";
import { TAcademicFaculty } from "./faculty.interface";
import { AcademicFaculty } from "./faculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getAllAcademicFacultyFromDB = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {
    meta,
    result,
  };
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
