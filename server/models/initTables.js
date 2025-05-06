
import { db } from '../config/db.js';

export const initTables = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Table creation connection error:', err);
      return;
    }

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        role ENUM('user', 'admin') DEFAULT 'user',
        refresh_token TEXT
      );
    `;

    const createEventsTable = `
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        date DATE,
        location VARCHAR(255),
        tickets_available INT,
        photo_url TEXT
      );
    `;

    const createBookingsTable = `
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        event_id INT,
        tickets INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      );
    `;

    connection.query(createUsersTable, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
      } else {
        console.log('Users table ensured.');
      }
    });

    connection.query(createEventsTable, (err) => {
      if (err) {
        console.error('Error creating events table:', err);
      } else {
        console.log('Events table ensured.');
      }
    });

    connection.query(createBookingsTable, (err) => {
      if (err) {
        console.error('Error creating bookings table:', err);
      } else {
        console.log(' Bookings table ensured.');
      }
    });

    connection.release();
  });
};
