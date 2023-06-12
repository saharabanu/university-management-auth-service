import express, { Application, Response, Request, NextFunction } from 'express';
const app: Application = express();
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';

import routes from './app/routes';
import httpStatus from 'http-status';

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

// for testing

app.get('/', (req: Request, res: Response) => {
  // errorLogger.error("testing error logger")

  res.send('work successfully');
});

// global error handler

app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: ' API Not Found',
      },
    ],
  });
  next();
});

export default app;

/*

 "no-console": "error",
   "no-undef": "error",
   "no-unused-expressions": "error",
   "no-unreachable": "error",

 .vscode, setting.json file e {
     "editor.codeActionsOnSave":{
       "source.fixAll.eslint":true,
       "source.organizeImports":true
   }
 }

 
*/
