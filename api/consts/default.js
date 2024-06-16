export const DATABASE_CONFIG = {
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD
};

export const COOKIE_OPTIONS = {
	expiresIn: process.env.COOKIE_LIFE,
};

export const TICKETS_UNLIMITED = -1;
export const HOURS_BEFORE_EVENT = 4;