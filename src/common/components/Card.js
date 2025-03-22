/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/react'

function Card({ children, hAlign = 'start', ...props }) {
  const cardCSS = css`
    display: flex;
    flex-direction: column;
    align-items: ${hAlign};
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `

  return (
    <div css={cardCSS} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hAlign: PropTypes.oneOf(['center', 'start', 'end'])
}

export default Card