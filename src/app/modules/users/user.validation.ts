import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

// req validation
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
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

      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father Name  is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation  is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father ContactNo is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name  is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother ContactNo is required',
        }),
        address: z.string({
          required_error: 'Father and Mother Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local Guardian  Name  is required',
        }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation  is required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian ContactNo is required',
        }),
        address: z.string({
          required_error: 'Local Guardian Address is required',
        }),
      }),

      academicSemester: z.string({
        required_error: 'Academic Semester  is required',
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

export const userValidation = {
  createUserZodSchema,
};
