import React from 'react'
import PropTypes from 'prop-types'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export default function LayoutBand({children, direction = 'column'}) {
  const wrapperCSS = css`
    display: flex;
    flex-direction: ${direction};
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 15px;
  `

  return (
    <div css={wrapperCSS}>
      {children}
    </div>
  )
}

LayoutBand.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['row', 'column'])
}