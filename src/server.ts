import dotenv from "dotenv";
dotenv.config();

import { pool } from "./config/database";
import app from "./app";

// global initialization

const PORT = process.env.PORT || 8000;

// const pgClient =  connectDB().then(res => {
//     app.listen(PORT, () => {
//         console.log(`🚀 Server is running on port ${PORT}`)
//     })
//     console.log("DB Connected Successfully! :)");
// }).catch(err => {
//     console.log("Error in DB Connection ->", err.message);
// });

(async () => {
  try {
    await pool.connect();
    console.log('✅ DB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB connection error:', (err as Error).message);
    process.exit(1);
  }
})();

// export default pgClient;