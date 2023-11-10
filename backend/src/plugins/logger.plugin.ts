import pino from 'pino';

export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      messageFormat: '{levelLabel} {msg}',
      singleLine: true
    }
  }
});