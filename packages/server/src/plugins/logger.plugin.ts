import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logsDir = path.resolve('./logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [{
      level: 'info',
      target: 'pino-pretty',
      options: {
        colorize: true,
        messageFormat: '{msg}',
        singleLine: true
      }
    }, {
      level: 'trace',
      target: 'pino/file',
      options: {
        destination: './logs/trace.log'
      }
    }]
  }
});