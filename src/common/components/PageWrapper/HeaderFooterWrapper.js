/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export const headerFooterCss = css`
  display: flex;
  padding: 8px 24px;
  background-color: white;
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.95));
`

export default function HeaderFooterWrapper({ Element, children, css: passedCss, ...props }) {
  return (
    <Element css={[headerFooterCss, passedCss]} {...props}>
      {children}
    </Element>
  )
}