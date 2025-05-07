import { db } from '../config/db.js';

const bookingModel = {
  bookEvent: async (userId, eventId, tickets) => {
    const [result] = await db.query(
      'INSERT INTO bookings (user_id, event_id, tickets) VALUES (?, ?, ?)',
      [userId, eventId, tickets]
    );
    return result.affectedRows === 1;
  },

  getUserBookings: async (userId) => {
    const [rows] = await db.query(
      `
      SELECT b.id, e.title, e.date, b.tickets 
      FROM bookings b
      JOIN events e ON b.event_id = e.id
      WHERE b.user_id = ?
      `,
      [userId]
    );
    return rows;
  },

  getAllBookings: async () => {
    const [rows] = await db.query(
      `
      SELECT b.id, u.name AS user, e.title AS event, b.tickets 
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN events e ON b.event_id = e.id
      `
    );
    return rows;
  }
};

export default bookingModel;
