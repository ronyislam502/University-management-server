import { model, Schema } from "mongoose";
import { TDepartment } from "./department.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const DepartmentSchema = new Schema<TDepartment>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

DepartmentSchema.pre("save", async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department is already exist"
    );
  }
  next();
});

DepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic department does not exist"
    );
  }
  next();
});

export const AcademicDepartment = model<TDepartment>(
  "AcademicDepartment",
  DepartmentSchema
);
