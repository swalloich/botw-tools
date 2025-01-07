import React from 'react'
import { Link } from 'react-router'

function NavBar({links}) {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar