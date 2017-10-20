import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <h3>
        <Link to="/">Home</Link>
      </h3>
      <h3>
        <Link to="/campuses">Campuses</Link>
      </h3>
      <h3>
      <Link to="/students">Students</Link>
      </h3>
    </nav>
  )
}
