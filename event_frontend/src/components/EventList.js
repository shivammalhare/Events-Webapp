import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Container, 
  Pagination, 
  CircularProgress, 
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import EventCard from './EventCard';

const EventList = ({ events, loading, error, searchTerm }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventType, setEventType] = useState('upcoming'); // Default to "upcoming"
  const [selectedCountry, setSelectedCountry] = useState('All'); // Country filter
  const eventsPerPage = 9; // 3 cards per row

  // Helper to parse DD/MM/YYYY to JS Date
  const parseEventDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(+year, +month - 1, +day);
  };

  useEffect(() => {
    if (!events) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let filtered = events.filter(event => {
      // Search filter
      const searchMatch = !searchTerm || 
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.Country && event.Country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.organizer && event.organizer.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!searchMatch) return false;

      // Country filter
      if (
        selectedCountry !== 'All' &&
        (!event.Country || event.Country.toLowerCase() !== selectedCountry.toLowerCase())
      ) {
        return false;
      }

      // Date filter
      const eventDate = parseEventDate(event.date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventType === 'upcoming') {
        return eventDate >= today;
      } else if (eventType === 'past') {
        return eventDate < today;
      }
      // 'all' returns all events
      return true;
    });

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [events, searchTerm, eventType, selectedCountry]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventTypeChange = (event, newEventType) => {
    if (newEventType !== null) {
      setEventType(newEventType);
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error loading events: {error}
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Events'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Paper elevation={0} sx={{ p: 0.5 }}>
            <ToggleButtonGroup
              value={eventType}
              exclusive
              onChange={handleEventTypeChange}
              aria-label="event type"
              size="small"
            >
              <ToggleButton value="all" aria-label="all events">
                All Events
              </ToggleButton>
              <ToggleButton value="upcoming" aria-label="upcoming events">
                Upcoming
              </ToggleButton>
              <ToggleButton value="past" aria-label="past events">
                Past
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={selectedCountry}
              label="Country"
              onChange={handleCountryChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="India">India</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {filteredEvents.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          No events found matching your criteria.
        </Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentEvents.map((event, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={event.id || index}
                className="fade-in"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  flex: '1 1 auto'
                }}
              >
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {indexOfFirstEvent + 1}-{Math.min(indexOfLastEvent, filteredEvents.length)} of {filteredEvents.length} events
            </Typography>
          </Box>
        </>
      )}
    </Container>
  );
};

export default EventList;
