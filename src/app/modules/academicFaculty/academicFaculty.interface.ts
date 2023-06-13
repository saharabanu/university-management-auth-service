import { Model } from 'mongoose';

export type IAcademicFacultyTitles = {
  title: string;
};

export type IAcademicFaculty = {
  title: IAcademicFaculty;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
