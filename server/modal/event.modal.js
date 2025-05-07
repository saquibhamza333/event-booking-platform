import { db } from '../config/db.js';

const eventModel = {
  getAllEvents: async () => {
    const [rows] = await db.query('SELECT * FROM events');
    return rows;
  },

  createEvent: async ({ title, description, date, location, tickets_available, photo_url }) => {
    const [result] = await db.query(
      `INSERT INTO events (title, description, date, location, tickets_available, photo_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, date, location, tickets_available, photo_url]
    );
    return result.affectedRows === 1;
  },

  updateEvent: async ({ id, title, description, date, location, tickets_available, photo_url }) => {
    let query = `
      UPDATE events 
      SET title = ?, description = ?, date = ?, location = ?, tickets_available = ?`;
    const values = [title, description, date, location, tickets_available];

    if (photo_url) {
      query += `, photo_url = ?`;
      values.push(photo_url);
    }

    query += ` WHERE id = ?`;
    values.push(id);

    const [result] = await db.query(query, values);
    return result.affectedRows === 1;
  },

  deleteEvent: async (id) => {
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
    return result.affectedRows === 1;
  },
};

export default eventModel;
