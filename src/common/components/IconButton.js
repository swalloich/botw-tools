/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function IconButton({ color, icon, iconSize, onClick, ...props }) {
  const iconButtonCss = css`
    border: none;
    background: none;
    ${color ? `color: ${color};` : ''}
    cursor: pointer;
    padding: 7.5px;
    margin: 0;
  `

  return (
    <button css={iconButtonCss} onClick={onClick} {...props}>
      <FontAwesomeIcon icon={icon} size={iconSize} />
    </button>
  )
}

export default IconButton