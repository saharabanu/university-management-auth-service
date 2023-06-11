import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemester } from './academicSemister.interface';

const createSemester = async (payload: IAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemieterService = {
  createSemester,
};
