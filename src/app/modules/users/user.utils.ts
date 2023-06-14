import { IAcademicSemester } from '../academicSemister/academicSemister.interface';
import { User } from './user.model';

// find user by Id
export const findLastStudentId = async (): Promise<string | undefined> => {
  //if any user admit first time then he will get default id or he can get his last id
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(5) : undefined;
};

// to find creating current user id

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const lastStudentId = await findLastStudentId();
  const currentId = lastStudentId || (0).toString().padStart(5, '0');
  let incrementedById = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedById = `${academicSemester?.year.substring(2) || '00'}${
    academicSemester?.code || '00'
  }${incrementedById}`;

  return incrementedById;
};

const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

// to find creating Faculty user id

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedById = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedById = `F-${incrementedById} `;

  return incrementedById;
};
