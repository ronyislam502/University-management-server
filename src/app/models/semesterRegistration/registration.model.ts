import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./registration.interface";
import { SemesterRegistrationStatus } from "./registration.const";
import { AcademicSemester } from "../academicSemester/semester.model";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "AcademicSemester",
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: "UPCOMING",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  }
);

semesterRegistrationSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

semesterRegistrationSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

semesterRegistrationSchema.statics.isSemesterExists = async function (
  id: string
) {
  const existingSemester = await AcademicSemester.findOne({ id });
  return existingSemester;
};

export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
