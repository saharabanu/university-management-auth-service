import { Model } from 'mongoose';

export type IManagementDepartmentTitles = {
  title: string;
};

export type IManagementDepartment = {
  title: IManagementDepartmentTitles;
};

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type IManagementDepartmentFilters = {
  searchTerm?: string;
};
