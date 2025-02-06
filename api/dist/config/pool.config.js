import pg from "pg";
const { Pool } = pg;
const { POSTGRES_URL, POSTGRES_ADMIN_URL } = process.env;
export const adminPoll = new Pool({
    connectionString: POSTGRES_ADMIN_URL,
});
export const pool = new Pool({
    connectionString: POSTGRES_URL,
});
