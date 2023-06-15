import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IStudent } from './student.interface';
import { pagination } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { studentFilterableFields } from './student.constant';
import { StudentService } from './student.service';

// get all students
const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, studentFilterableFields);

  const paginationOptions = pick(req.query, pagination);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Students retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get Single student

// const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await AcademicSemesterService.getSingleSemester(id);

//   sendResponse<IAcademicSemester>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'SIngle academic Semester retrieved successfully',
//     data: result,
//   });
// });

// update Student

// const updateSemester = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;

//   const result = await AcademicSemesterService.updateSemester(id, updatedData);

//   sendResponse<IAcademicSemester>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Update SIngle academic Semester retrieved successfully',
//     data: result,
//   });
// });

// DELETE Student

// const deleteSemester = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await AcademicSemesterService.deleteSemester(id);

//   sendResponse<IAcademicSemester>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: ' a single academic Semester deleted successfully',
//     data: result,
//   });
// });

export const StudentsController = {
  getAllStudents,
};
