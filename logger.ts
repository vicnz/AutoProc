import winston from 'winston'
const { combine, colorize, timestamp, json, simple, metadata } = winston.format

const logger = winston.createLogger({
    level: 'info',
    format: combine(colorize(), timestamp(), json(), metadata()),
    transports: [
        new winston.transports.File({
            filename: 'app.log',
        }),
    ]
})


if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: simple()
    }))
}
export { logger }