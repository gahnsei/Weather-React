import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = `73ba83ed83e73c7638741b841092bf9b14611765e21c703dce817459f9c99431`;

const BASE_URL = `https://api.ambeedata.com`;
const axiosHeader = {
  headers: {
    "Content-Type": `application/json`,
    "x-api-key": API_KEY
  }
};

function Weather(props) {
  const [weather, setWeather] = useState([]);

  const { location, loading } = props;
  let latitude = 50;
  let longitude = 50;

  if (location.hasOwnProperty(`referencePosition`)) {
    if (location.referencePosition.hasOwnProperty(`latitude`)) {
      latitude = location.referencePosition.latitude;
      longitude = location.referencePosition.longitude;
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${latitude}&lng=${longitude}`,
        axiosHeader
      )
      .then((res) => {
        setWeather(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [latitude, longitude]);

  const slideUp = loading ? `loading` : `slide-up`;
  const fadeIn = loading ? `loading` : `fade-in`;

  return (
    <>
      <div className={`temp ${slideUp}`}>{weather.temperature + `°`}</div>
      <div className="extra-information">
        <div className={`extra-info-card ${fadeIn}`}>
          <span>Feels Like</span>
          {weather.apparentTemperature + `°`}
        </div>
        <div className={`extra-info-card ${fadeIn}`}>
          <span>Humidity</span>
          {weather.humidity}
        </div>
        <div className={`extra-info-card ${fadeIn}`}>
          <span>Wind Speed</span>
          {weather.windSpeed + ` mph`}
        </div>
        <div className={`extra-info-card ${fadeIn}`}>
          <span>UV Index</span>
          {weather.uvIndex}
        </div>
      </div>
    </>
  );
}

export default Weather;
