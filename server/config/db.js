


import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

export const db = mysql.createPool({
 host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myapp_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});
// Configure database connection
// const sqlDb = mysql.createPool({
//   host: "evers-mern-database-1.cluster-cheykg6kex64.us-east-1.rds.amazonaws.com",
//   user: "evers_mern",
//   password: "haBFCju/G95IlA==",
//   database: "eversdb",
// });


