
const { level } = require('winston');
const winston = require('winston');
winston.remove(winston.transports.Console);
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.json(),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`    
    )
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log'}),
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.json(),
            winston.format.cli({colors: { info: 'blue', error: 'red' , warn: 'yellow'}})
        )
    })
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = { logger };