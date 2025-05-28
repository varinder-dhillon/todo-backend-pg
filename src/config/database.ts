import { Pool } from "pg";


export const connectDB = async () => {
    const client = new Pool({
        host: process.env.DB_Host,
        port: Number(process.env.DB_Port) || 5432,
        user: process.env.DB_User,
        database: process.env.DB_Database,
        password: process.env.DB_Password,
        max: 10,
        idleTimeoutMillis: 30000
    });

    await client.connect();
    return client;
}