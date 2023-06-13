import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemister.interface';
import httpStatus from 'http-status';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters;
  const academicSemesterSearchableFields = ['title', 'year', 'code'];

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // const andConditions = [
  //  {
  //   $or:[
  //     {title:{
  //       $regex:searchTerm,
  //       $options: 'i'

  //       }
  //     },
  //     {code:{
  //       $regex:searchTerm,
  //       $options: 'i'

  //       }
  //     },
  //     {year:{
  //       $regex:searchTerm,
  //       $options: 'i'

  //       }
  //     },
  //   ]
  //  }
  // ]
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
