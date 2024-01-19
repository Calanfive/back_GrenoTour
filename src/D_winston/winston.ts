export function winston_log() {
  const winston = require('winston');
  
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'D_winston_log/combined.log' }),
      new winston.transports.File({ filename: 'D_winston_log/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'D_winston_log/debug.log', level: 'debug' }),
    ],
  });

  // if (process.env.NODE_ENV !== 'production') {
  //   logger.add(new winston.transports.Console({
  //     format: winston.format.simple(),
  //   }));
  // }
}