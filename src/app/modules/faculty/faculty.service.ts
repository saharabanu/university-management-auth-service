/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose, { SortOrder } from 'mongoose';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { IUser } from '../users/user.interface';
import config from '../../../config';
import { generateFacultyId } from '../users/user.utils';
import { Faculty } from './faculty.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { facultySearchableFields } from './faculty.constant';
import { paginationHelper } from '../../../helpers/paginationHelper';

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // Default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // Set role
  user.role = 'faculty';

  // const academicFaculty = await Faculty.findById(faculty.academicFaculty);

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Auto-generated incremental id
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    // Create faculty
    const newFaculty = await Faculty.create([faculty], { session });
    if (newFaculty.length === 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create new Faculty!'
      );
    }

    // Set faculty _id into user
    user.faculty = newFaculty[0]._id;

    // Create user
    const newUser = await User.create([user], { session });
    if (newUser.length === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

// get all Faculties

const getAllFacultys = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single Faculty
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id);
  return result;
};

// Update single Faculty
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });
  console.log(isExist);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }

  /// for embed field

  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...facultyData };

  //dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });
  return result;
};

// delete Faculty

//why does not user delete in this function

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id);
  return result;
};

export const FacultyService = {
  createFaculty,
  getAllFacultys,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
