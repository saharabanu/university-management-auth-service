import { pagination } from './../../../constants/pagination';
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { IAcademicSemester } from './academicSemister.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

// create academic semester
const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic Semester created successfully',
      meta: {
        page: 0, // Replace with the actual page number
        limit: 0, // Replace with the actual limit per page
        total: 0, // Replace with the actual total number of records
      },
      data: result,
    });

    next();
  }
);

// get all semesters

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);

    const paginationOptions = pick(req.query, pagination);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All academic Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createAcademicSemesterController,
  getAllSemesters,
};
