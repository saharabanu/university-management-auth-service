import { IStudent } from './../student/student.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

import { IUser } from './user.interface';

import { AcademicSemester } from '../academicSemister/academicSemester.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { User } from './user.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password

  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // to set role
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    // for transaction
    session.startTransaction();
    // auto generated incremental id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;
    /// it is an array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create new Student!'
      );
    }

    // set student _id into user
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
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
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
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

export const UserService = {
  createStudent,
};
