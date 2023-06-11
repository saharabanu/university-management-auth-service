import { RequestHandler } from 'express';
import { AcademicSemieterService } from './academicSemester.service';

const createAcademicSemesterController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemieterService.createSemester(
      academicSemesterData
    );
    res.status(200).json({
      success: true,
      message: 'academic semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createAcademicSemesterController,
};
