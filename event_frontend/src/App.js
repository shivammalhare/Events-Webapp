import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import Footer from './components/Footer';
import { fetchEvents } from './services/api';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}
      >
        <Header />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 2 }}>
          <SearchBar onSearch={handleSearch} />
        </Container>

        <Box sx={{ flexGrow: 1 }}>
          <EventList 
            events={events} 
            loading={loading} 
            error={error} 
            searchTerm={searchTerm} 
          />
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
