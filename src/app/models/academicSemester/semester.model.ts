import { Schema, model } from "mongoose";

import { TSemester } from "./semester.interface";
import { SemesterCode, SemesterName, Months } from "./semester.const";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const SemesterSchema = new Schema<TSemester>(
  {
    name: {
      type: String,
      enum: SemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: SemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

SemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is already exists");
  }
  next();
});

export const AcademicSemester = model<TSemester>(
  "AcademicSemester",
  SemesterSchema
);
