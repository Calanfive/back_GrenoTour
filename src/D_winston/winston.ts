import {createLogger, format, transports } from "winston";
import winston from "winston";

const { combine, timestamp, label, prettyPrint } = format;

export const logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'user-service' },
  format: format.combine(
    format.json(),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.File({ filename: 'D_winston_log/combined.log'}),
  ],
})