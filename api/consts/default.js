const TOKEN_LIFE = '40d';

export const DATABASE_CONFIG = {
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD
};

export const COOKIE_OPTIONS = {
	expiresIn: TOKEN_LIFE,
};

export const TICKETS_UNLIMITED = -1;