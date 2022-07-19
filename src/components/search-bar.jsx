import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'

import { getLocationSuggestions } from '../external-data/location-query'

const getLocationListTags = (locations) => {
  if (locations.length === 0) return <p>Nothing found</p>
  return locations.map(
    (loc, i) =>
      <li key={i}>
        <Link to={`/${loc.latitude}:${loc.longitude}:${loc.label}`}>
          {loc.label}
        </Link>
      </li>
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
    if (res.error) {
      setLocations(
        <p>{res?.error?.response?.statusText || "Some errror occurred"}</p>
      )
      return
    }

    const locListTags = getLocationListTags(res?.data?.data)
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

