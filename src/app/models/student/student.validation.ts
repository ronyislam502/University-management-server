import { z } from "zod";

// create validation schema

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(20, "First name cannot be more than 20 characters")
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: "First name must start with an uppercase letter",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(20, "Last name cannot be more than 20 characters"),
});

// Guardian Schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father name is required"),
  fatherOccupation: z.string().min(1, "Father occupation is required"),
  fatherContactNo: z.string().min(1, "Father contact number is required"),
  motherName: z.string().min(1, "Mother name is required"),
  motherOccupation: z.string().min(1, "Mother occupation is required"),
  motherContactNo: z.string().min(1, "Mother contact number is required"),
});

// LocalGuardian Schema
const createLocalGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Local guardian father name is required"),
  fatherOccupation: z
    .string()
    .min(1, "Local guardian father occupation is required"),
  fatherContactNo: z
    .string()
    .min(1, "Local guardian father contact number is required"),
  motherName: z.string().min(1, "Local guardian mother name is required"),
  motherOccupation: z
    .string()
    .min(1, "Local guardian mother occupation is required"),
  motherContactNo: z
    .string()
    .min(1, "Local guardian mother contact number is required"),
});

// Student Schema
export const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Email is not valid"),
      contactNo: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required"),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        required_error: "Blood group is required",
      }),
      presentAddress: z.string().min(1, "Present address is required"),
      permanentAddress: z.string().min(1, "Permanent address is required"),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// update validation schema

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Student Schema
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  CreateStudentValidationSchema,
  updateStudentValidationSchema,
};
