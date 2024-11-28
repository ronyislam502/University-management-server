import { Model, Types } from "mongoose";

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};

export interface SemesterRegistrationModel
  extends Model<TSemesterRegistration> {
  isSemesterExists(id: string): Promise<TSemesterRegistration | null>;
}
