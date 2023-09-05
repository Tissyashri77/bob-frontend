import { Box, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailCard from "../common/components/MovieDetailCard";
import Navbar from "../common/components/Navbar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SeatSelection from "../common/components/SeatSelection";

function Booking() {
  const params = useParams();
  const movieId = params.id;

  const [movieDetail, setMovieDetail] = useState();
  const token = localStorage.getItem('token')

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:8090/movies/${movieId}`, config)
      .then((res) => {
        setMovieDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 6); // One week from the current date

  const dateLabels = [];

  while (startDate <= endDate) {
    dateLabels.push(startDate.toDateString());
    startDate.setDate(startDate.getDate() + 1);
  }

  const showtimes = ["09:00 AM", "11:30 AM", "02:30 PM", "05:00 PM", "08:00 PM", "11:00 PM"];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedtime, setSelectedTime] = useState();

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <Box>
      <Navbar />

      <Container>
        <MovieDetailCard {...movieDetail} />
        <Box>
          <Typography variant="h6">Select a Date:</Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            {dateLabels.map((date, index) => (
              <Chip
                key={index}
                label={date}
                clickable
                onClick={() => handleDateClick(date)}
                sx={{
                  backgroundColor:
                    selectedDate === date ? "#CAEDFF" : "#4355805a",
                  color: selectedDate === date ? "hsl(222, 44%, 16%)" : "#FFF",
                }}
              />
            ))}
          </Box>
          <Typography variant="h6" mt={3}>Showtimes:</Typography>
          <Box display="flex" mt={2} gap={2}>
            {showtimes.map((showtime, index) => (
              <Chip
                key={index}
                label={showtime}
                variant="outlined"
                clickable
                onClick={() => {
                  setSelectedTime(showtime);
                }}
                sx={{
                  backgroundColor:
                    selectedtime === showtime ? "#CAEDFF" : "#4355805a",
                  color:
                    selectedtime === showtime ? "hsl(222, 44%, 16%)" : "#FFF",
                }}
              />
            ))}
          </Box>

          <SeatSelection selectedDate={selectedDate} selectedtime={selectedtime} movieId={movieId}/>
        </Box>
      </Container>
    </Box>
  );
}

export default Booking;
