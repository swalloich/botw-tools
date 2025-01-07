/** @jsxImportSource @emotion/react */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

function LayoutBand({children, direction = 'column'}) {
  const wrapperCSS = css`
    display: flex;
    flex-direction: ${direction};
    max-width: 1100px;
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

export default LayoutBand