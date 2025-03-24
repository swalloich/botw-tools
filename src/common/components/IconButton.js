/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const iconButtonCss = css`
  border: none;
  background: none;
  cursor: pointer;
  padding: 7.5px;
  margin: 0;
`

function IconButton({ icon, iconSize, onClick, ...props }) {
  return (
    <button css={iconButtonCss} onClick={onClick} {...props}>
      <FontAwesomeIcon icon={icon} size={iconSize} />
    </button>
  )
}

export default IconButton