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

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SIngle  Student retrieved successfully',
    data: result,
  });
});

// update Student

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single a Student Updated successfully',
    data: result,
  });
});

// DELETE Student

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' a single  Student deleted successfully',
    data: result,
  });
});

export const StudentsController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
