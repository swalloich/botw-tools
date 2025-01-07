/** @jsxImportSource @emotion/react */
import React from 'react'
import { Outlet } from 'react-router'
import { css } from '@emotion/react'
import NavBar from './NavBar'

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
`

const headerCss= css`
  display: flex;
  padding: 8px 24px;
  background-color: white;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
`

function PageWrapper({links}) {
  return (
    <div css={wrapperCSS}>
      <header css={headerCss}>
        <img src="https://placehold.co/150x75" alt="" width={150} height={75} />
        <NavBar links={links} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default PageWrapper
