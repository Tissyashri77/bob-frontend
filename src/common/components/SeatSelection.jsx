import React, { useEffect, useState } from "react";
import { Box, Grid, Button, Divider, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function SeatSelection({ selectedDate, selectedtime, movieId }) {
  console.log(selectedtime);
  console.log(selectedDate);
  const isDateTimeChosen = selectedDate && selectedtime;
  const [selectedSeatsLeft, setSelectedSeatsLeft] = useState([]);
  const [selectedSeatsRight, setSelectedSeatsRight] = useState([]);
  const { user } = useAuth();
  const [toast, setToast] = useState(false);

  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const getBookings = async () => {
      axios
        .get(`http://localhost:8090/movies/booking/${movieId}?date=${selectedDate}&time=${selectedtime}`, config)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    isDateTimeChosen && getBookings()
  }, [isDateTimeChosen]);

  const toggleSeat = (row, seat) => {
    if (row === "left") {
      const isSelected = selectedSeatsLeft.includes(seat);
      if (isSelected) {
        setSelectedSeatsLeft(selectedSeatsLeft.filter((s) => s !== seat));
      } else {
        setSelectedSeatsLeft([...selectedSeatsLeft, seat]);
      }
    } else if (row === "right") {
      const isSelected = selectedSeatsRight.includes(seat);
      if (isSelected) {
        setSelectedSeatsRight(selectedSeatsRight.filter((s) => s !== seat));
      } else {
        setSelectedSeatsRight([...selectedSeatsRight, seat]);
      }
    }
  };

  user && console.log(user);

  const handleSubmit = () => {
    let seatsl = [];
    let seatsr = [];

    for (let i = 0; i < selectedSeatsLeft.length; i++) {
      seatsl.push(`L${selectedSeatsLeft[i]}`);
    }

    for (let i = 0; i < selectedSeatsRight.length; i++) {
      seatsr.push(`R${selectedSeatsRight[i]}`);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "http://localhost:8090/movies/book",
        {
          movieId: movieId,
          showdate: selectedDate,
          showtime: selectedtime,
          seats: [...seatsl, ...seatsr],
          bookedbyId: user.userid,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const bookedSeats = bookings && bookings.seats

  console.log(bookedSeats);
  let Lbooked = []
  let Rbooked = []
  for(let j=0;bookedSeats && j<bookedSeats.length;j++){
    const temp = bookedSeats[j]
    const key = (bookedSeats[j])[0]
    const numericPart = temp.replace(/[^\d]/g, '');
    
    if(key == "L"){
      Lbooked.push(parseInt(numericPart))
    }
    else if(key=="R"){
      Rbooked.push(parseInt(numericPart))
    }
  }

  const renderSeats = (numSeats, row) => {
    
    const seats = [];
    const selectedSeats =
      row === "left" ? selectedSeatsLeft : selectedSeatsRight;
    const bookedSeats = row === "left" ? Lbooked : Rbooked;

    for (let i = 1; i <= numSeats; i++) {
      const isSelected = selectedSeats.includes(i);
      const isBooked = bookedSeats.includes(i)
      seats.push(
        <Grid
          key={i}
          item
          className={`${isSelected && !isBooked ? "selected" : isBooked ? "booked" : ""}`}
          sx={{
            width: "40px",
            height: "40px",
            margin: "4px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&.selected": {
              backgroundColor: "#CAEDFF", // Color for selected seats
              color: "black",
            },
            "&.booked":{
              backgroundColor: "#FF5722", // Color for selected seats
              color: "#fff",
            }
          }}
          onClick={() => !isBooked && toggleSeat(row, i)}
        >
          {i}
        </Grid>
      );
    }
    return seats;
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        {isDateTimeChosen ? (
          <Divider sx={{ borderTop: "1px solid #CAEDFF" }}>
            Screen Comes here
          </Divider>
        ) : (
          <Typography variant="h6" color="#CAEDFF" fontSize="14px">
            Please choose a date and time.
          </Typography>
        )}
      </Box>
      {isDateTimeChosen && (
        <Grid container spacing={1} my={4}>
          <Grid item container justifyContent="center" xs={6}>
            {renderSeats(80, "left")}
          </Grid>
          <Grid item container justifyContent="center" xs={6}>
            {renderSeats(80, "right")}
          </Grid>
        </Grid>
      )}
      {isDateTimeChosen && (
        <Box mt={2}>
          <p>Selected Seats - Left:</p>
          {selectedSeatsLeft.length === 0 ? (
            <p style={{ fontSize: "12px", opacity: 0.7 }}>No seats selected</p>
          ) : (
            selectedSeatsLeft.map((seat) => (
              <span
                key={seat}
                sx={{
                  width: "40px",
                  height: "40px",
                  margin: "4px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  "&.selected": {
                    backgroundColor: "#FF5722", // Color for selected seats
                    color: "#fff",
                  },
                }}
                style={{ fontSize: "14px", opacity: 0.7 }}
              >
                {"L" + seat + ", "}
              </span>
            ))
          )}
          <p>Selected Seats - Right:</p>
          {selectedSeatsRight.length === 0 ? (
            <p style={{ fontSize: "12px", opacity: 0.7 }}>No seats selected</p>
          ) : (
            selectedSeatsRight.map((seat) => (
              <span
                key={seat}
                sx={{
                  width: "40px",
                  height: "40px",
                  margin: "4px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  "&.selected": {
                    backgroundColor: "#FF5722", // Color for selected seats
                    color: "#fff",
                  },
                }}
                style={{ fontSize: "14px", opacity: 0.7 }}
              >
                {"R" + seat + ", "}
              </span>
            ))
          )}
        </Box>
      )}
      {isDateTimeChosen && (
        <Box
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={user && handleSubmit}
          >
            Book Now
          </Button>
        </Box>
      )}

      {toast && (
        <Box
          sx={{
            position: "fixed",
            bottom: "10px", // Adjust the distance from the bottom as needed
            left: "10px", // Adjust the distance from the left as needed
            color: "#fff", // Text color
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Optional shadow effect
          }}
        >
          <Alert severity="success">Success Ticket's Booked.</Alert>
        </Box>
      )}
    </div>
  );
}

export default SeatSelection;
