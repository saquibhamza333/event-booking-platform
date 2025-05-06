import { db } from '../config/db.js';


export const bookEvent = (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.event_id;
  const { tickets } = req.body;

  const query = `INSERT INTO bookings (user_id, event_id, tickets) VALUES (?, ?, ?)`;
  db.query(query, [userId, eventId, tickets], (err, result) => {
    if (err) return res.status(500).json({ message: 'Booking failed' });
    res.status(201).json({ message: 'Booking successful' });
  });
};


export const getMyBookings = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT b.id, e.title, e.date, b.tickets 
    FROM bookings b
    JOIN events e ON b.event_id = e.id
    WHERE b.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching bookings' });
    res.json(results);
  });
};


export const getAllBookings = (req, res) => {
  const query = `
    SELECT b.id, u.name as user, e.title as event, b.tickets 
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN events e ON b.event_id = e.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching all bookings' });
    res.json(results);
  });
};
