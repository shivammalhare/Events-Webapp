import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button,
  Box,
  useScrollTrigger,
  Slide
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  return (
    <HideOnScroll>
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <EventIcon 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 1, 
                color: 'primary.main' 
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              REZO-EVENTS 
            </Typography>

            <EventIcon 
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                mr: 1, 
                color: 'primary.main' 
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              REZO-EVENTS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                Home
              </Button>
              <Button sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                All Events
              </Button>
              <Button sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                About
              </Button>
              <Button sx={{ my: 2, color: 'text.primary', display: 'block' }}>
                Contact
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button variant="contained" color="primary" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                Create Event
              </Button>
              <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
