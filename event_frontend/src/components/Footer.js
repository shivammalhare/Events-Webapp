import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  Divider,
  Stack,
  IconButton
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EventIcon from '@mui/icons-material/Event';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                EVENT PLATFORM
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Discover, attend, and organize exceptional events worldwide. Our platform connects event organizers with
              attendees looking for memorable experiences.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="facebook" size="small" color="primary">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="twitter" size="small" color="primary">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="linkedin" size="small" color="primary">
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="instagram" size="small" color="primary">
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Explore
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              All Events
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              Featured Events
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              Categories
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              Locations
            </Link>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Resources
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              Help Center
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              FAQs
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Subscribe to Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Stay updated with the latest events and news.
            </Typography>
            <form>
              {/* Add your newsletter subscription form here */}
            </form>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Event Platform. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ px: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ px: 1 }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;