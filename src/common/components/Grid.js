import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { repeat } from './utilities'

export default function Grid({ children, columns = 3, gap = 20 }) {
  const gridCss = css`
    display: grid;
    grid-template-columns: ${repeat(columns, '1fr')};
    grid-gap: ${gap}px;
  `

  return (
    <div css={gridCss}>
      {children}
    </div>
  )
}