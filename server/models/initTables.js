import { db } from '../config/db.js';

export const initTables = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Table creation connection error:', err);
      return;
    }

    const dropTables = `
      DROP TABLE IF EXISTS bookings;
      DROP TABLE IF EXISTS events;
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

    const seedEvents = `
      INSERT INTO events (title, description, date, location, tickets_available, photo_url)
      VALUES 
      ('Music Fest', 'A grand music festival.', '2025-06-01', 'Mumbai', 100, 'https://dummyimage.com/300'),
      ('Tech Conference', 'Annual tech meetup.', '2025-06-10', 'Bangalore', 200, 'https://dummyimage.com/300');
    `;

    connection.query(dropTables, (err) => {
      if (err) {
        console.error('Error dropping tables:', err);
        connection.release();
        return;
      }

      connection.query(createEventsTable, (err) => {
        if (err) {
          console.error('Error creating events table:', err);
        } else {
          console.log('✅ Events table created');

          connection.query(seedEvents, (err) => {
            if (err) console.error('Error seeding events:', err);
            else console.log('🌱 Events table seeded');
          });
        }
      });

      connection.query(createBookingsTable, (err) => {
        if (err) {
          console.error('Error creating bookings table:', err);
        } else {
          console.log('✅ Bookings table created');
        }
      });

      connection.release();
    });
  });
};
