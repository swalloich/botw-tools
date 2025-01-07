import React from 'react'
import { Outlet } from 'react-router'
import { css } from '@emotion/react'
import NavBar from './NavBar'
import LayoutBand from './LayoutBand'

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  & .container {
    max-width: 1200px;
    margin: 0 auto;
  }
`

function PageWrapper({links}) {
  return (
    <div css={wrapperCSS}>
      <header>
        <LayoutBand direction="row">
          <img src="https://placehold.co/150x75" alt="" width={150} height={75} />
          <NavBar links={links} />
        </LayoutBand>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default PageWrapper
