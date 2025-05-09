import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const accessToken = useSelector((state) => state.auth.accessToken); 
  console.log("Access Token:", accessToken);
// adjust based on your slice name
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    tickets_available: ''
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events:', err.response?.data || err.message);
      }
    };

    if (accessToken) {
      fetchEvents();
    }
  }, [accessToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (photo) {
        data.append('photo', photo);
      }

      const res = await axios.post('http://localhost:5000/api/events', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
         withCredentials: true,
      });


      setEvents(prev => [...prev, res.data]);
      setFormData({ title: '', description: '', date: '', location: '', tickets_available: '' });
      setPhoto(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error creating event:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 ">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 mb-6"
      >
        {showForm ? 'Close Form' : 'Create Event'}
      </button>

      {showForm && (
        
        <form onSubmit={handleCreateEvent} className="bg-black p-6 rounded-lg space-y-4 w-full max-w-md text-white mx-auto">
          {['title', 'description', 'date', 'location', 'tickets_available'].map((field) => (
            <div key={field}>
              <label className="block capitalize mb-1">{field.replace('_', ' ')}:</label>
              <input
                type={field === 'date' ? 'date' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
          ))}
          <div>
            <label className="block mb-1">Event Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full text-white"
            />
          </div>
          <button type="submit" className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 font-bold">Submit</button>
        </form>
      )}

      <div className="mt-10 space-y-4 w-[500px]">
        <h2 className="text-2xl text-orange-400 font-semibold">Event List</h2>
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="bg-black text-orange-400 px-4 py-2 rounded-md shadow">
              {event.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;

