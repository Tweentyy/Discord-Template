import pkg from "winston";

const { createLogger, format, transports } = pkg;
const { combine, timestamp, printf } = format;

export function log(type: string, message: string | Error) {
	const messageFormat = printf(
		({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`,
	);
	const date = new Date();
	const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	const logger = createLogger({
		transports: [
			new transports.Console(),
			new transports.File({
				filename: `../logs/${formattedDate}_logs`,
			}),
		],
		format: combine(timestamp({ format: date.toLocaleString("fr-FR") }), messageFormat),
	});
	logger.log(type, message);
}
