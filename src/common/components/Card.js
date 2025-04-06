/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types'
import React from 'react'
import { css } from '@emotion/react'

function Card({ children, hAlign = 'start', padding = 'medium', ...props }) {
  let paddingValue = '1rem'
  switch (padding) {
    case 'none':
      paddingValue = '0'
      break
    case 'small':
      paddingValue = '0.5rem'
      break
    case 'medium':
      paddingValue = '1rem'
      break
    case 'large':
      paddingValue = '1.5rem'
      break
    default:
      break
  }

  const cardCSS = css`
    display: flex;
    flex-direction: column;
    align-items: ${hAlign};
    background-color: white;
    border-radius: 8px;
    padding: ${paddingValue};
    box-shadow: 0 0 10px rgba(5, 5, 5, 0.1);
  `

  return (
    <div css={cardCSS} {...props}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hAlign: PropTypes.oneOf(['center', 'start', 'end']),
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
}

export default Card