/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/react'

function Card({children}) {
  const cardCSS = css`
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `

  return (
    <div css={cardCSS}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired
}

export default Card