import { Router } from "express";
import { UserRoutes } from "../models/user/user.route";
import { SemesterRoutes } from "../models/academicSemester/semester.route";
import { AcademicFacultyRoutes } from "../models/academicFaculty/faculty.route";
import { DepartmentRoutes } from "../models/academicDepartment/department.route";
import { AdminRoutes } from "../models/admin/admin.route";
import { FacultyRoutes } from "../models/faculty/faculty.route";
import { CourseRoutes } from "../models/course/course.route";
import { SemesterRegistrationRoutes } from "../models/semesterRegistration/registration.route";
import { OfferedCourseRoutes } from "../models/courseOffered/offeredCourse.route";
import { AuthRoutes } from "../models/auth/auth.route";
import { EnrolledCoursesRoutes } from "../models/enrolledCourses/enrolledCourses.route";
import { StudentRoutes } from "../models/student/student.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/semesters",
    route: SemesterRoutes,
  },
  {
    path: "/academicFaculties",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/departments",
    route: DepartmentRoutes,
  },
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semesterRegistrations",
    route: SemesterRegistrationRoutes,
  },
  {
    path: "/offeredCourses",
    route: OfferedCourseRoutes,
  },
  {
    path: "/enrolledCourses",
    route: EnrolledCoursesRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
