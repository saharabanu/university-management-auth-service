import express, { Application, Response, Request } from 'express';
const app: Application = express();
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';

import { UserRoute } from './app/modules/users/user.route';

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users/', UserRoute);

// for testing

app.get('/', (req: Request, res: Response) => {
  // errorLogger.error("testing error logger")

  res.send('work successfully');
});

// global error handler

app.use(globalErrorHandler);

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
