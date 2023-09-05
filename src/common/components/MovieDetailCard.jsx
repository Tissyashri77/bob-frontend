import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MovieDetailCard = ({ movieName, releaseDate, theatreLocation, theatreName }) => {
  return (
    <Card sx={{ my:6, boxShadow: 1,  boxShadow: 1, background: '#4355805a' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="#CAEDFF" fontWeight="600" fontSize={24}>
          Movie Details: 
        </Typography>
        <Typography variant="subtitle1" color="#CAEDFF" fontWeight="400">
          Movie Name: {movieName}
        </Typography>
        <Typography variant="subtitle1" color="#CAEDFF" fontWeight="400">
          Release Date: {new Date(releaseDate).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1" color="#CAEDFF" fontWeight="400">
          Theatre: {theatreName} ({theatreLocation})
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieDetailCard;
