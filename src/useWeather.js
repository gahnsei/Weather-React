import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function useWeather() {
  const [input, setInput] = useState(``);
  const [location, setLocation] = useState({});
  const [background, setBackground] = useState(``);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=28488065-f0f96da5d2947a149f59ec05f&q=${
          location.formattedAddress || `rainy`
        }
    `
      )
      .then((res) => setBackground(res.data.hits[0].largeImageURL))
      .catch((err) => console.log(err));
  }, [location]);

  const inputChange = (event) => {
    const { value } = event.target;
    setInput(value);
    setError(false);
  };

  const searchCity = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${input}&apiKey=NTM4YWY1ZjIwNjhiNDY5YzgyODNlZTlkYzk5OGQwNjM6NmEzOWJhN2ItYTkwOS00OTU5LTlmOTUtZjZjNjc2N2RjYTQ1`
      )
      .then((res) => {
        if (res.data.locations.length === 0) {
          setError(true);
        } else {
          setLocation(res.data.locations[0]);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    input,
    inputChange,
    searchCity,
    location,
    background,
    error,
    loading
  };
}

export default useWeather;
