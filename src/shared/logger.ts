import path from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import DailyRotateFile from 'winston-daily-rotate-file';

// custom log

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return ` ${date.toDateString()} ${hour}:${minutes}:${minutes}:${seconds} } [${label}] ${level} : ${message}  `;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UNM' }),
    timestamp(),
    myFormat
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'unm-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'OOOPs!!! Failed' }),
    timestamp(),
    myFormat

    //  we use this for well formatting prettyPrint()
  ),
  transports: [
    new transports.Console(),

    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'unm-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
export { logger, errorLogger };
