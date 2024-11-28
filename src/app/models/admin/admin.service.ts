/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { AdminSearchableFields } from "./admin.const";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllAdminIntoDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminIntoDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete Admin");
    }

    const userId = deletedAdmin.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to deleted User");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const AdminServices = {
  getAllAdminIntoDB,
  getSingleAdminIntoDB,
  updateAdminFromDB,
  deleteAdminFromDB,
};
