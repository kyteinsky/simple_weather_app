import axios from 'axios'

export const getLocationSuggestions = async (q) => {
  try {
    return await axios.get(`http://api.positionstack.com/v1/forward`,
      {
        params: {
          query: q,
          limit: 5,
          access_key: import.meta.env.VITE_POSITION_STACK_APIKEY,
          output: 'json'
        }
      }
    )
  } catch (error) {
    console.error(error)
    return { error }
  }
}

