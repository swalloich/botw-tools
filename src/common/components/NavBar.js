/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import { Link } from 'react-router'

const navCss = css`
  display: flex;

  & ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: 20px;

    li {
      display: flex;
      align-items: center;
      a {
        height: fit-content;
        padding: 10px 15px;
      }
    }
  }
`

function NavBar({links}) {
  return (
    <nav css={navCss}>
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