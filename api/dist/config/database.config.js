import { adminPoll } from "./pool.config.js";
const { POSTGRES_DB } = process.env;
export const createDatabaseIfNotExists = async () => {
    const client = await adminPoll.connect();
    const response = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [POSTGRES_DB]);
    if (response.rowCount === 0) {
        await client.query(`CREATE DATABASE ${POSTGRES_DB}`);
    }
    else {
        console.log(`Database ${POSTGRES_DB} already exists`);
    }
    try {
    }
    catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        else {
            throw new Error("Error creating database if not exists");
        }
    }
    finally {
        client.release();
    }
};
