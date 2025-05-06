import { db } from '../config/db.js';
import cloudinary from '../config/cloudinary.js';


export const getAllEvents = (req, res) => {
  db.query('SELECT * FROM events', (err, result) => {
    if (err) return res.status(500).send('Database error');
    res.json(result);
  });
};


export const createEvent = async (req, res) => {
  const { title, description, date, location, tickets_available } = req.body;
  const file = req.file;

  try {
    if (!file) return res.status(400).json({ message: 'Photo is required' });

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'event_photos' },
      (error, result) => {
        if (error) return res.status(500).json({ message: 'Cloudinary upload error', error });

        const photo_url = result.secure_url;

        const query = `
          INSERT INTO events (title, description, date, location, tickets_available, photo_url)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(
          query,
          [title, description, date, location, tickets_available, photo_url],
          (err) => {
            if (err) return res.status(500).send('Error creating event');
            res.status(201).send('Event created with photo');
          }
        );
      }
    );

    stream.end(file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, tickets_available } = req.body;
  const file = req.file;

  try {
    const updateQuery = async (photo_url = null) => {
      const query = `
        UPDATE events 
        SET title = ?, description = ?, date = ?, location = ?, tickets_available = ?
        ${photo_url ? ', photo_url = ?' : ''}
        WHERE id = ?
      `;

      const values = photo_url
        ? [title, description, date, location, tickets_available, photo_url, id]
        : [title, description, date, location, tickets_available, id];

      db.query(query, values, (err) => {
        if (err) return res.status(500).send('Error updating event');
        res.send('Event updated');
      });
    };

    if (file) {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'event_photos' },
        async (error, result) => {
          if (error) return res.status(500).json({ message: 'Cloudinary upload error', error });
          await updateQuery(result.secure_url);
        }
      );
      stream.end(file.buffer);
    } else {
      await updateQuery(); // No photo uploaded
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// DELETE event
export const deleteEvent = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM events WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Error deleting event');
    res.send('Event deleted');
  });
};
