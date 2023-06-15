import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.service';
import { IFaculty } from './faculty.interface';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './faculty.constant';
import { pagination } from '../../../constants/pagination';

//create Faculty

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty, ...facultyData } = req.body;
  const result = await FacultyService.createFaculty(faculty, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty created successfully',
    data: result,
  });
});

// get Single Faculty

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single  Faculty retrieved successfully',
    data: result,
  });
});

// get all faculty
const getAllFacultys: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, facultyFilterableFields);

  const paginationOptions = pick(req.query, pagination);

  const result = await FacultyService.getAllFacultys(
    filters,
    paginationOptions
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// DELETE Faculty

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' a Faculty deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFacultys,
  getSingleFaculty,
  deleteFaculty,
};
