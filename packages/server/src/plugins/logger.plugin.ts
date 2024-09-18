import pino from 'pino';

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