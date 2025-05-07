import bookingModal from '../modal/booking.modal.js';

export const bookEvent = async (req, res) => {
  const userId = req.user.id;
  const eventId = req.params.event_id;
  const { tickets } = req.body;

  try {
    const success = await bookingModal.bookEvent(userId, eventId, tickets);
    if (!success) {
      return res.status(500).json({ message: 'Booking failed' });
    }

    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Book Event Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  const userId = req.user.id;

  try {
    const bookings = await bookingModal.getUserBookings(userId);
    res.json(bookings);
  } catch (error) {
    console.error('Get My Bookings Error:', error.message);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModal.getAllBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Get All Bookings Error:', error.message);
    res.status(500).json({ message: 'Error fetching all bookings', error: error.message });
  }
};
