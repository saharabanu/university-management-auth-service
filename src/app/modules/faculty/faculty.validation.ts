import { z } from 'zod';
import { bloodGroup, gender } from './faculty.constant';

// req validation
const createFacultyZodSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First Name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle Name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last Name is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact No is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact  no is required',
      }),
      presentAddress: z.string({
        required_error: 'present Address  is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent Address  is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group  is required',
        })
        .optional(),

      designation: z.string({
        required_error: 'Designation  is required',
      }),

      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty  is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

// req validation
const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    academicSemester: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const FacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
};
