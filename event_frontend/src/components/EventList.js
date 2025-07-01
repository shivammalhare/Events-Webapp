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
  MenuItem,
  Button
} from '@mui/material';
import EventCard from './EventCard';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const EventList = ({ events, loading, error, searchTerm }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventType, setEventType] = useState('upcoming'); // Default to "upcoming"
  const [selectedCountry, setSelectedCountry] = useState('All'); // Country filter
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
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

    if (selectedDate) {
      filtered = filtered.filter(event => {
        const eventDate = parseEventDate(event.date);
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        );
      });
    }
    if (selectedMonth) {
      filtered = filtered.filter(event => {
        const eventDate = parseEventDate(event.date);
        return (
          eventDate.getFullYear() === selectedMonth.getFullYear() &&
          eventDate.getMonth() === selectedMonth.getMonth()
        );
      });
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [events, searchTerm, eventType, selectedCountry, selectedDate, selectedMonth]);

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

  const handleClearFilters = () => {
    setEventType('upcoming');
    setSelectedCountry('All');
    setSelectedDate(null);
    setSelectedMonth(null);
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
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          mb: 4,
          mt: 1,
          gap: 2
        }}
      >
        {/* Heading */}
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 'bold', mb: { xs: 2, sm: 0 }, minWidth: 120 }}
        >
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Events'}
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Event Type Toggle Buttons (no label) */}
          <Paper elevation={0} sx={{ p: 0.5, boxShadow: 'none', background: 'none', minWidth: 180 }}>
            <ToggleButtonGroup
              id="event-type-toggle"
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

          {/* Date Filter */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Filter by Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            </LocalizationProvider>
          </FormControl>

          {/* Month Filter */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year', 'month']}
                label="Filter by Month"
                value={selectedMonth}
                onChange={(newValue) => setSelectedMonth(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    fullWidth: true,
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            </LocalizationProvider>
          </FormControl>

          {/* Country Filter */}
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

          {/* Clear Filters Button */}
          <Button
            variant="outlined"
            size="small"
            onClick={handleClearFilters}
            sx={{ whiteSpace: 'nowrap', borderRadius: '24px', px: 2, height: 40 }}
          >
            Clear Filters
          </Button>
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
