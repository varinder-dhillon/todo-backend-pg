// initDb.ts
import { connectDB } from "./database";

const init = async () => {
    const pool = await connectDB();
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS board (
                id SERIAL PRIMARY KEY,
                name VARCHAR(55) DEFAULT 'My task board',
                description TEXT DEFAULT 'Tasks to keep organised',
                created_at TIMESTAMP DEFAULT NOW()
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                completed BOOLEAN DEFAULT false,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await pool.query(`
            DROP TRIGGER IF EXISTS set_updated_at ON users;
            CREATE TRIGGER set_updated_at
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();
        `);

        console.log('✅ Tables created successfully');
    } catch (err) {
        console.error('❌ Failed to create tables:', err);
    } finally {
        await pool.end();
    }
};

init();