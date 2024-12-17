import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function PageWrapper(props) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="clothing">Clothing</Link>
          </li>
          <li>
            <Link to="cooking">Cooking</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default PageWrapper
