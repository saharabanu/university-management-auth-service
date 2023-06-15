import { SortOrder } from 'mongoose';

import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';

// get all semsesters

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // this condition is used for getting all semesters without any searching, page or limit etc
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Student
// const getSingleSemester = async (
//   id: string
// ): Promise<IAcademicSemester | null> => {
//   const result = await AcademicSemester.findById(id);
//   return result;
// };
// Update single semester
// const updateSemester = async (
//   id: string,
//   payload: Partial<IAcademicSemester>
// ): Promise<IAcademicSemester | null> => {
//   if (
//     payload.title &&
//     payload.code &&
//     academicSemesterTitleCodeMapper[payload.title] !== payload.code
//   ) {
//     throw new ApiError(
//       httpStatus.BAD_REQUEST,
//       'Invalid Semester Code or Title'
//     );
//   }
//   const result = await AcademicSemester.findOneAndUpdate(
//     {
//       _id: id,
//     },
//     payload,
//     {
//       new: true,
//     }
//   );
//   return result;
// };

// delete semester
// const deleteSemester = async (
//   id: string
// ): Promise<IAcademicSemester | null> => {
//   const result = await AcademicSemester.findByIdAndDelete(id);
//   return result;
// };

export const StudentService = {
  getAllStudents,
};
