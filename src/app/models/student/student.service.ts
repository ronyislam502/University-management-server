/* eslint-disable @typescript-eslint/no-unused-vars */
// import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

import { studentSearchableFields } from "./student.const";
import QueryBuilder from "../../builder/queryBuilder";

// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   const queryObject = { ...query }; // copy

//   const studentSearchTerms = ["email", "name.firstName", "presentAddress"];

//   let searchTerm = "";
//   if (query?.searchTerm) {
//     searchTerm = query.searchTerm as string;
//   }

//   const searchQuery = Student.find({
//     $or: studentSearchTerms.map((field) => ({
//       [field]: { $regex: searchTerm, $options: "i" },
//     })),
//   });

//   // filtering
//   const excludeFields = ["searchTerm", "sort", "page", "limit", "fields"];
//   excludeFields.forEach((element) => delete queryObject[element]);

//   // console.log({ query }, { queryObject });

//   // console.log({ query, queryObject });

//   const filterQuery = await searchQuery
//     .find(queryObject)
//     .populate("admissionSemester")
//     .populate({
//       path: "academicDepartment",
//       populate: {
//         path: "academicFaculty",
//       },
//     });

//   // sorting

//   let sort = "-createdAt";
//   if (query?.sort) {
//     sort = query.sort as string;
//     // console.log(sort);
//   }

//   const sortQuery = filterQuery.sort(sort);

//   // limit & paginate

//   let page = 1;
//   let limit = 1;
//   let skip = 0;

//   if (query.limit) {
//     limit = Number(query.limit);
//   }

//   if (query.page) {
//     page = Number(query.page);
//     skip = (page - 1) * limit;
//   }

//   const paginateQuery = await sortQuery.skip(skip);

//   const limitQuery = await paginateQuery.limit(limit);

//   // field filtering

//   let fields = "-__v";

//   if (query.fields) {
//     fields = (query.fields as string).split(",").join(" ");
//     // console.log({ fields });
//   }

//   const fieldQuery = await limitQuery.select(fields);

//   return fieldQuery;
// };

// const getSingleStudentFromDB = async (_id: string) => {
//   const result = await Student.aggregate([{ $match: { _id } }]);
//   return result;
// };

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (_id: string) => {
  const result = await Student.findById(_id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  // name updating data

  if (name && Object.keys(name)) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  // guardian updating data

  if (guardian && Object.keys(guardian)) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  // local guardian updating data

  if (localGuardian && Object.keys(localGuardian)) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedStudentData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error("Failed to deleted student");
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
