import { z } from 'zod';

// req  check zod validation
const createAndUpdateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

// req  check update zod validation
// const updateAcademicFacultyZodSchema = z
//   .object({
//     body: z.object({
//      title:z.string({
//       required_error: 'Title is required',
//      })

//     }),
//   });

export const AcademicFacultyValidation = {
  createAndUpdateAcademicFacultyZodSchema,
};
