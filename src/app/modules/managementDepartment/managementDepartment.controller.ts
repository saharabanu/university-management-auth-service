import { pagination } from './../../../constants/pagination';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ManagementDepartmentService } from './managementDepartment.service';
import catchAsync from '../../../shared/catchAsync';
import { IManagementDepartment } from './managementDepartment.interface';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';

// create academic Faculty
const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ManagementDepartment created successfully',

      data: result,
    });
  }
);

// get all ManagementDepartment

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);

    const paginationOptions = pick(req.query, pagination);

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All ManagementDepartment retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// get Single ManagementDepartment

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SIngle ManagementDepartment retrieved successfully',
      data: result,
    });
  }
);

// update ManagementDepartment

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment Updated successfully',
      data: result,
    });
  }
);

// DELETE ManagementDepartment

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' A ManagementDepartment deleted successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
};
