import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic Semester created successfully',
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: 'academic semester created successfully',
    //   data: result,
    // });
  }
);

export const AcademicSemesterController = {
  createAcademicSemesterController,
};
