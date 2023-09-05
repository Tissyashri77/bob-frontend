import React, { useEffect, useState } from "react";
import Navbar from "../common/components/Navbar";
import Box from "@mui/material/Box";
import axios from "axios";
import MovieCard from "../common/components/MovieCard";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

function Home() {
  const [moviesList, setMoviesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTheatre, setFilterTheatre] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchMovies() {
      const res = await axios.get("http://localhost:8090/movies", config);
      setMoviesList(res.data);
    }

    fetchMovies();
  }, []);

  moviesList && console.log(moviesList);

  // Create a single filter function that considers both searchQuery and filterTheatre
  const filteredMovies = moviesList.filter((data) => {
    const movieNameIncludesQuery = data.movieName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const theatreNameMatchesFilter =
      filterTheatre === "" ||
      data.theatreName.toLowerCase() === filterTheatre.toLowerCase();

    return movieNameIncludesQuery && theatreNameMatchesFilter;
  });

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 6,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            component="search"
            size="small"
            sx={{
              background: "#4355805a",
              outline: "none",
              border: "none",
              borderRadius: "4px",
              width: "250px",
              "& .MuiInputBase-root": {
                color: "#CAEDFF",
              },
            }}
            placeholder="Search by Movie Name"
          />
        </Box>
        <FormControl
          variant="outlined"
          sx={{
            width: 300,
            backgroundColor: "#4355805a",
            borderRadius: "5px",
          }}
          size="small"
        >
          <InputLabel sx={{ color: "#CAEDFF", opacity:0.4}}>
            Filter by Theatre Name
          </InputLabel>{" "}
          {/* Text color */}
          <Select
            value={filterTheatre}
            onChange={(e) => setFilterTheatre(e.target.value)}
            label="Filter by Theatre Name"
          >
            <MenuItem value="">All Theatres</MenuItem>
            {/* Assuming moviesList is an array of movie objects */}
            {moviesList.map((data, index) => (
              <MenuItem key={index} value={data.theatreName}>
                {data.theatreName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredMovies.map((data, index) => (
          <MovieCard key={index} data={data} />
        ))}
      </Box>
    </Box>
  );
}

export default Home;
