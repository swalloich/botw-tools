/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types'
import { css } from '@emotion/react'

export default function LayoutBand({children, direction = 'column', ...props}) {
  const wrapperCSS = css`
    display: flex;
    flex-direction: ${direction};
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 576px) {
      max-width: 540px;
    }

    @media (min-width: 768px) {
      max-width: 720px;
    }

    @media (min-width: 992px) {
      max-width: 960px;
    }

    @media (min-width: 1200) {
      max-width: 1140px;
    }

    @media (min-width: 1400) {
      max-width: 1320px;
    }
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