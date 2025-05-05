

import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to load events", err));
  }, []);
    
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.event_id} className="p-4 border rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{event.event_name}</h2>
            <p className="text-sm text-gray-500">{event.date} — {event.location}</p>
            <p className="mt-2 text-gray-700 line-clamp-3">{event.description}</p>
            <div className="mt-2 text-sm">
              <strong>Organizer:</strong> {event.organizer}
            </div>
            <div className="text-sm">
              <strong>Contact:</strong> {event.contact_email}
            </div>
            <a
              href={event.contact_url}
              target="_blank"
              className="inline-block mt-2 text-blue-600 underline"
              rel="noreferrer"
            >
              Event Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
