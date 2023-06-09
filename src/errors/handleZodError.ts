import { IGenericErrorMessage } from './../interfaces/error';
import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Handle Zod Error',
    errorMessages: errors,
  };
};

export default handleZodError;
