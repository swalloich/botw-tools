/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export const headerFooterCss = css`
  display: flex;
  padding: 8px 24px;
  background-color: var(--background-color);
  filter: drop-shadow(0 0 7px var(--shadow-color));
`

export default function HeaderFooterWrapper({ Element, children, css: passedCss, ...props }) {
  return (
    <Element css={[headerFooterCss, passedCss]} {...props}>
      {children}
    </Element>
  )
}