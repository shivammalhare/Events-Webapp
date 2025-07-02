import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkIcon from '@mui/icons-material/Link';
import Linkify from 'linkify-react';


const EventCard = ({ event }) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (descRef.current) {
        setShowButton(descRef.current.scrollHeight > descRef.current.clientHeight);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [event.description, expanded]);

  // Format the date
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  };

  // Check if the event date is in the future
  const isUpcomingEvent = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [day, month, year] = event.date.split('/');
    const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  return (
    <>
      <Card
        className="event-card-animation fade-in"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
        }}
        elevation={0}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 230 }}>
          {/* Event Name */}
          <Typography
            variant="h6"
            component="div"
            sx={{ color: '#222', fontWeight: 600, mb: 1, minHeight: '2.2em' }}
          >
            {event.event_name}
          </Typography>

          {/* Date and Upcoming/Past Chip */}
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {formatDate(event.date)}
            </Typography>
            {isUpcomingEvent() ? (
              <Chip label="Upcoming" size="small" color="primary" sx={{ ml: 'auto' }} />
            ) : (
              <Chip label="Past" size="small" color="default" sx={{ ml: 'auto' }} />
            )}
          </Box>

          {/* Location */}
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <LocationOnIcon fontSize="small" color="error" />
            <Typography variant="body2" color="text.secondary">
              {event.location}
              
            </Typography>
          </Box>

        {/* Description Clamp */}
        <Box
  sx={{
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    gap: 1,
    mb: 1,
    flexWrap: { xs: 'wrap', sm: 'nowrap' }
  }}
>
  <div
    ref={descRef}
    style={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: expanded ? 'none' : 1,
      WebkitBoxOrient: 'vertical',
      minHeight: '1.5em',
      flex: 1,
      wordBreak: 'break-word'
    }}
  >
    {event.description}
  </div>
  {showButton && (
    <Button
      size="small"
      onClick={() => setExpanded((prev) => !prev)}
      sx={{
        p: 0,
        minHeight: 0,
        minWidth: 0,
        ml: 1,
        alignSelf: 'flex-start',
        fontSize: '0.85em',
        whiteSpace: 'nowrap'
      }}
    >
      {expanded ? 'Read less' : 'Read more'}
    </Button>
  )}
</Box>
          <Divider sx={{ my: 1 }} />

          {/* Footer with sponsorship, organizer, contact, etc */}
          <Box sx={{ mt: 'auto' }}>
            {event.organizer && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <BusinessIcon fontSize="small" color="info" />
                <Typography variant="body2" color="text.secondary">
                  {event.organizer}
                </Typography>
              </Box>
            )}

            {event.sponsorship && event.sponsorship !== 'N/A' && (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
    <AttachMoneyIcon fontSize="small" color="success" />
    <Typography variant="body2" color="text.secondary">
      {/* Use the Linkify component here */}
      <Linkify as="span" options={{ target: '_blank', rel: 'noopener noreferrer' }}>
        {event.sponsorship}
      </Linkify>
    </Typography>
  </Box>
)}

            {event.contact && (event.contact.email || event.contact.phone) && (
  <Box sx={{ mt: 1 }}>
    <Grid container spacing={1}>
      {event.contact.email && event.contact.email !== 'N/A' && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon fontSize="small" color="primary" />
            <a href={`mailto:${event.contact.email}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="text.secondary">
                {event.contact.email}
              </Typography>
            </a>
          </Box>
        </Grid>
      )}

      {event.contact.phone && event.contact.phone !== 'N/A' && (
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon fontSize="small" color="primary" />
            <a href={`tel:${event.contact.phone}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="text.secondary">
                {event.contact.phone}
              </Typography>
            </a>
          </Box>
        </Grid>
      )}
    </Grid>
  </Box>
)}
            {event.url && (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<LinkIcon />}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 2 }}
                fullWidth
              >
                Visit Website
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Modal/Dialog for full description */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {event.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventCard;
