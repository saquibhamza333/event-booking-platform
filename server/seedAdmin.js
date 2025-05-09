import bcrypt from "bcrypt";
import { db } from "./config/db.js";

const seedAdmin = async () => {
  const admin = {
    name: "saquib",
    email: "saquib333@gmail.com",
    password: "password", // Change this in production
    role: "admin",
  };

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [admin.email]);

    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [admin.name, admin.email, hashedPassword, admin.role]
      );
      console.log("✅ Admin user seeded successfully.");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }
  } catch (error) {
    console.error("❌ Error seeding admin user:", error.message);
  } finally {
    db.end(); // close pool
  }
};

seedAdmin();
