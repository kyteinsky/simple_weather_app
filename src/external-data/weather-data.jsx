import axios from 'axios'

export const getWeather = async ({ lat, lon }) => {
  try {
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: import.meta.env.VITE_OPEN_WEATHER_APIKEY,
        }
      }
    )
  } catch (error) {
    console.error(error)
    return { error }
  }
}

