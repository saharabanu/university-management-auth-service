import { z } from 'zod';

// req validation
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
  }),
  year: z.number({
    required_error: 'Year is required',
  }),
  code: z.enum(['01', '02', '03'], {
    required_error: 'Code is required',
  }),

  startMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    {
      required_error: 'StartMonth is required',
    }
  ),
  endMonth: z.enum(
    [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    {
      required_error: 'EndMonth is required',
    }
  ),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
