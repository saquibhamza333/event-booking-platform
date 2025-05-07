import { db } from "../config/db.js";

const authModal = {
  isUserExists: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log("isUserExists")
    return rows.length > 0;
  },

  createUser: async ({ name, email, hashedPassword }) => {
    console.log("in create user")
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    console.log("end of create user")
    return result.affectedRows === 1;
  },

  getUserByEmail: async (email) => {
    console.log("i'm here in getUserByEmail");
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log("after getuserbyemail")
    return rows[0];
  },

  updateRefreshToken: async (userId, token) => {
    console.log("Reached updateRefreshToken");
    await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [token, userId]);
  },
};

export default authModal;
