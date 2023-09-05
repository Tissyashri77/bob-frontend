import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';

export default function MovieCard(props) {
  const { movieName, releaseDate, theatreLocation, theatreName } = props.data;

  const handleBookTicket = () => {
    // Add your logic here to handle booking
    alert(`Book ticket for ${movieName} at ${theatreName}`);
  };

  return (
    <Card sx={{ width: 400, margin: '16px', boxShadow: 1, background: '#4355805a' }}>
      <CardContent >
        <Typography variant="h6" component="div" color="#CAEDFF" fontWeight="600">
          {movieName}
        </Typography>
        <Typography variant="subtitle1" color="#CAEDFF">
          Release Date: {new Date(releaseDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2"  sx={{ mt: 1 }} color="#CAEDFF">
          Theatre: {theatreName} ({theatreLocation})
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="outlined" color="info" href={`/booking/${props.data._id}`}>
            Book Ticket
        </Button>
      </Box>
    </Card>
  );
}
