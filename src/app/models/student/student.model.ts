import { model, Schema } from "mongoose";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: UserNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: GuardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: true,
    },
    profileImg: {
      type: String,
      default: "",
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

StudentSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} + ${this?.name?.middleName} + ${this?.name?.lastName}`;
});

StudentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  // console.log(this);
  next();
});

StudentSchema.pre("aggregate", function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
});

StudentSchema.statics.isUserExists = async function (id: string) {
  const userExisting = await Student.findOne({ id });
  return userExisting;
};

export const Student = model<TStudent, StudentModel>("Student", StudentSchema);
