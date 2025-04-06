/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

export default function Fieldset({ legend, children, ...props }) {
  const fieldsetCss = css`
    border-radius: 0.5rem;
    padding: 1rem;
  `

  return (
    <fieldset css={fieldsetCss} {...props}>
      <legend>
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}

Fieldset.propTypes = {
  legend: PropTypes.string,
  children: PropTypes.node.isRequired,
}