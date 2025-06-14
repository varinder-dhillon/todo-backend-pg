// initDb.ts

import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { pool } from "./database";


export const initDb = catchAsync(async (req, res, next) => {

    try {
        await pool.query(`DROP TABLE todos;`)
        await pool.query(`DROP TABLE board;`)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS board (
                id SERIAL PRIMARY KEY,
                name VARCHAR(55) DEFAULT 'My task board',
                description TEXT DEFAULT 'Tasks to keep organised',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT DEFAULT '',
                boardId INTEGER NOT NULL REFERENCES board(id) ON DELETE CASCADE,
                icon TEXT NOT NULL CHECK (icon IN ('work', 'thinking', 'tea', 'exercise', 'study', 'clock')),
                status TEXT CHECK (status IN ('inProgress', 'completed', 'wontDo', '')),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // await pool.query(`
        //     CREATE OR REPLACE FUNCTION update_updated_at_column()
        //     RETURNS TRIGGER AS $$
        //     BEGIN
        //         NEW.updated_at = NOW();
        //         RETURN NEW;
        //     END;
        //     $$ LANGUAGE plpgsql;
        // `);

        // await pool.query(`
        //     DROP TRIGGER IF EXISTS set_updated_at ON users;
        //     CREATE TRIGGER set_updated_at
        //     BEFORE UPDATE ON users
        //     FOR EACH ROW
        //     EXECUTE PROCEDURE update_updated_at_column();
        // `);

        // console.log('✅ Tables created successfully');
        res.status(200).json({
            status: "Success",
            message: "✅ Tables created successfully"
        })
    } catch (err:any) {
        next(new AppError('❌ Failed to create tables: '+err?.message,  400))
    }
})

