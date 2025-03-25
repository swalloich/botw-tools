/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

const gaps = {
  none: 0,
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem'
}

export default function Row({ children, gap='none', justify = 'flex-start', ...props }) {
  const rowCss = css`
    display: flex;
    flex-wrap: wrap;
    gap: ${gaps[gap]};
    justify-content: ${justify};
    width: 100%;
  `

  return (
    <div css={rowCss} {...props}>
      {children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  gap: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  justify: PropTypes.oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'space-evenly'
  ])
}