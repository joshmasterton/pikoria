import pg from "pg";
const { Pool } = pg;
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB, POSTGRES_PORT, NODE_ENV, } = process.env;
export const adminPoll = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    database: "postgres",
    ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});
export const pool = new Pool({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    port: Number(POSTGRES_PORT),
    ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});
