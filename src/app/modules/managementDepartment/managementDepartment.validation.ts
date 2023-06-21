import { z } from 'zod';

// req  check zod validation
const createAndUpdateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createAndUpdateManagementDepartmentZodSchema,
};
