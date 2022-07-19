import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { getWeather } from '../external-data/weather-data'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const getWeatherCard = ({ main, weather, wind }) => {
  return (
    <>
      <p><span style={{ fontSize: 40 }}>{main.temp} °C</span></p>
      <p>{weather.length > 0 ? capitalize(weather[0].description) : ""}</p>
      <p>Max Temp: {main.temp_max} Min Temp: {main.temp_min}</p>
      <p>Pressure: {main.pressure} Humidity: {main.humidity}</p>
      <p>Wind: {wind.speed} km/h</p>
    </>
  )
}

export default function WeatherModule() {
  const { location } = useParams()
  const [loc, setLoc] = useState("")
  const [weatherData, setWeatherData] = useState(<>Loading...</>)

  useEffect(() => {
    const [lat, lon, label] = location.split(':')
    setLoc(label)
    setInterval(() =>
      getWeather({ lat, lon })
        .then(res => {
          if (!res?.data) throw "data key not found in response"
          setWeatherData(getWeatherCard(res.data))
        })
        .catch(err => {
          console.error(err)
          setWeatherData("Error fetching weather data")
        })
      , 2000)
  }, [])

  return (
    <>
      <p>&nbsp;</p>
      <p style={{ fontSize: 22 }}>Weather for: <b>{loc}</b></p>
      {weatherData}
      <p>&nbsp;</p>
      <Link to="/"><input type="button" value="Return to Home" /></Link>
    </>
  )
}

