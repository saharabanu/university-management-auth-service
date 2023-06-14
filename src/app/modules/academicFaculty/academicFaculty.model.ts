import { Schema, model } from 'mongoose';

import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// for checking and control same same semester
// academicFacultySchema.pre('save', async function (next) {
//   const isExist = await AcademicSemester.findOne({
//     title: this.title,

//   });

//   if (isExist) {
//     throw new ApiError(
//       httpStatus.CONFLICT,
//       'Academic Semester is already exist !'
//     );
//   }
//   next();
// });

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
