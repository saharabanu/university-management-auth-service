import { ManagementDepartmentRoute } from './../modules/managementDepartment/managementDepartment.route';
import express from 'express';
import { UserRoute } from '../modules/users/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemister/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoute } from '../modules/student/student.route';
import { FacultyRoute } from '../modules/faculty/faculty.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/faculty',
    route: FacultyRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
