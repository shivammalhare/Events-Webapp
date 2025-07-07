const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://events-webapp.onrender.com/events';

// Transform backend data to match UI expectations
const transformEvent = (event, index) => ({
  id: index + 1, // Generate ID since backend doesn't provide one
  event_name: event.event_name,
  description: event.description,
  date: event.date,
  location: event.location,
  Country: event.Country, // Note: Capital C in your backend
  sponsorship: event.sponsorship,
  organizer: event.organizer,
  url: event.url,
  contact: event.contact
});

export const fetchEvents = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map(transformEvent);
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export default { fetchEvents };
