import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { css } from '@emotion/react'

function PageWrapper({links}) {

  const wrapperCSS = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    & .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  `

  return (
    <div css={wrapperCSS}>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default PageWrapper
