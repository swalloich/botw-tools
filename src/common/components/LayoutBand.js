/** @jsxImportSource @emotion/react */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

function LayoutBand({children, direction = 'column'}) {
  const wrapperCSS = css`
    display: flex;
    flex-direction: ${direction};
    max-width: 1200px;
    margin: 0 auto;
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

export default LayoutBand