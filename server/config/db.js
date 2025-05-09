import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "myapp_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

// Test a connection after pool is created
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL connection pool created and connected successfully");
    connection.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err);
  }
})();

