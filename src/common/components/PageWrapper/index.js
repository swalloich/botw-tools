/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
`

const mainCss = css`
  flex-grow: 1;
  min-height: calc(100dvh - 91px);
`

function PageWrapper({links}) {
  return (
    <div css={wrapperCSS}>
      <Header links={links} />
      <main css={mainCss}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PageWrapper
