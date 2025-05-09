import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; // adjust path as needed

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events'); 
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='bg-[#7D9998] min-h-screen w-full py-10 px-4'>
      <h1 className="text-3xl font-bold text-center text-black mb-8">All Events</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            tickets={event.tickets_available}
            imageUrl={event.photo_url}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
