import eventModel from "../modal/event.modal.js"
import uploadOnCloudinary from '../utils/cloudinary.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await eventModal.getAllEvents();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
};

export const createEvent = async (req, res) => {
  const { title, description, date, location, tickets_available } = req.body;
  const file = req.file;
  console.log(file);

  console.log("Received Data:", title, description, date, location, tickets_available);
  console.log("Received File:", file);
  console.log("In create event controller");

  try {
    if (!file) {
      return res.status(400).json({ message: 'Photo is required' });
    }
console.log(file)
    const photoResult = await uploadOnCloudinary(file.path); 

    console.log(`photpresult ${photoResult}`)

    if (!photoResult?.url) {
      return res.status(500).json({ message: 'Image upload failed' });
    }

    await eventModel.createEvent(
      title,
      description,
      date,
      location,
      tickets_available,
      photoResult.url
    );

    console.log("Event created successfully");
    return res.status(201).json({ message: 'Event created successfully' });

  } catch (err) {
    console.error("Error creating event:", err);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, tickets_available } = req.body;
  const file = req.file;

  try {
    const handleUpdate = async (photo_url = null) => {
      const success = await eventModal.updateEvent({
        id,
        title,
        description,
        date,
        location,
        tickets_available,
        photo_url,
      });

      if (!success) return res.status(500).send('Error updating event');
      res.send('Event updated');
    };

    if (file) {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'event_photos' },
        async (error, result) => {
          if (error) return res.status(500).json({ message: 'Cloudinary upload error', error });
          await handleUpdate(result.secure_url);
        }
      );
      stream.end(file.buffer);
    } else {
      await handleUpdate(); // No image provided
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const success = await eventModal.deleteEvent(id);
    if (!success) return res.status(500).send('Error deleting event');
    res.send('Event deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
