/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { FacultySearchableFields } from "./faculty.const";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllFacultyIntoDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    }),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await facultyQuery.modelQuery;

  return result;
};

const getSingleFacultyIntoDB = async (id: string) => {
  const result = await Faculty.findById(id).populate({
    path: "academicDepartment",
    populate: {
      path: "academicFaculty",
    },
  });
  return result;
};

const updateFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedFaculty: Record<string, unknown> = { ...remainingFacultyData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedFaculty[`name.${key}`] = value;
    }
  }
  const result = await Faculty.findByIdAndUpdate(id, modifiedFaculty, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true, session }
    );

    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Faculty");
    }
    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.abortTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const FacultyServices = {
  getAllFacultyIntoDB,
  getSingleFacultyIntoDB,
  deleteFacultyFromDB,
  updateFacultyFromDB,
};
