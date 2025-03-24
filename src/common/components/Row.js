/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

export default function Row({ children, justify = 'flex-start', ...props }) {
  const rowCss = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${justify};
  `

  return (
    <div css={rowCss} {...props}>
      {children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  justify: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly'
  ])
}