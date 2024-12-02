/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSemesterRegistration } from "./registration.interface";
import { SemesterRegistration } from "./registration.model";
import QueryBuilder from "../../builder/queryBuilder";
import { RegistrationStatus } from "./registration.const";
import mongoose from "mongoose";
import { OfferedCourse } from "../courseOffered/offeredCourse.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const isThereAnyUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });

  if (isThereAnyUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `there is already an ${isThereAnyUpcomingOrOngoing.status} registered semester`
    );
  }

  const academicSemester = payload?.academicSemester;

  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Semester not found");
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const querySemesterRegistration = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await querySemesterRegistration.modelQuery;
  const meta = await querySemesterRegistration.countTotal();

  return { result, meta };
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate("academicSemester");

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isSemesterExists = await SemesterRegistration.findById(id);

  if (!isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "this semester is not found !");
  }

  const currentSemesterStatus = isSemesterExists?.status;
  const requestedStatus = payload.status;

  if (currentSemesterStatus === RegistrationStatus?.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this semester is already ${currentSemesterStatus}`
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus?.UPCOMING &&
    requestedStatus === RegistrationStatus?.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus?.ONGOING &&
    requestedStatus === RegistrationStatus?.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This registered semester is not found"
    );
  }

  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "^You can not update as the registered semester is ${semesterRegistrationStatus}"
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      { session }
    );
    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semester registration"
      );
    }

    const deletedSemesterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemesterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to delete semester registration !"
      );
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id);

  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  deleteSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
