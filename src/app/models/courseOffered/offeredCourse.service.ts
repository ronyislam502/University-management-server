import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/registration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/faculty.model";
import { AcademicDepartment } from "../academicDepartment/department.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hashTineConflict } from "./offeredCourse.utilities";
import QueryBuilder from "../../builder/queryBuilder";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester registration not found");
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found");
  }

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`
    );
  }

  //   same semester same course not allow
  const isSameOfferedCourseWithSameSemesterSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (!isSameOfferedCourseWithSameSemesterSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Offered course with same section is already exist!"
    );
  }

  //   get schedule of the faculties(id:SR)

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hashTineConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This faculty is not available at that time, choose other time or date"
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });

  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;

  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const OfferCourse = await OfferedCourse.findById(id);

  if (!OfferCourse) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found");
  }

  return OfferCourse;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course not found !");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found !");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties

  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hashTineConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This faculty is not available at that time, choose other time or date"
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deletedOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered Course not found");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select("status");

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deletedOfferedCourseFromDB,
};
