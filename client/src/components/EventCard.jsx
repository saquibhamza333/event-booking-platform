const EventCard = ({ title, description, date, location, tickets, imageUrl }) => {
  return (
    <div className="bg-black text-white rounded-2xl overflow-hidden shadow-lg max-w-xs border-2 border-orange-500 hover:scale-105 transition-transform duration-300">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-orange-500">{title}</h2>
        <p className="text-sm text-gray-300 mt-1">{description}</p>
        <p className="text-sm text-gray-400 mt-2">
          📍 {location} <br />
          📅 {new Date(date).toLocaleDateString()} <br />
          🎟️ Tickets Left: {tickets}
        </p>
        <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-4 rounded-full transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
