import axios from 'axios'

export const getLocationSuggestions = async (q) => {
  try {
    return await axios.get(`https://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q,
          limit: 5,
          appid: import.meta.env.VITE_OPEN_WEATHER_APIKEY
        }
      }
    )
  } catch (error) {
    console.error(error)
    return { error }
  }
}

