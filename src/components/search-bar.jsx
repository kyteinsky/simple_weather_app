import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import { getLocationSuggestions } from '../external-data/location-query'

const getLocationListTags = (locations) => {
  if (locations.length === 0) return <p>Nothing found</p>
  return locations.map(
    (loc, i) => {
      const { lat, lon, name, state, country } = loc
      const label = [name, state, country].join(', ')
      return (
        <li key={i}>
          <Link to={`/${lat}:${lon}:${label}`}>{label}</Link>
        </li>
      )
    }
  )
}

export default function SearchBar() {
  const textBox = useRef(null)
  const [locations, setLocations] = useState([])

  const handleClick = async () => {
    const q = textBox.current.value
    if (q === "") {
      setLocations(<p>Empty query passed</p>)
      return
    }

    const res = await getLocationSuggestions(q)
    if (res?.status !== 200 || !res?.data) {
      setLocations(
        <p>{res.statusText || "Some errror occurred"}</p>
      )
      return
    }

    const locListTags = getLocationListTags(res.data)
    setLocations(locListTags)
  }

  return (
    <>
      <input type="text" ref={textBox} placeholder="Search Location" />
      <input type="button" onClick={handleClick} value="Search" />
      <ul>{locations}</ul>
    </>
  )
}

