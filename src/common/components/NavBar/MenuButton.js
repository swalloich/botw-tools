/** @jsxImportSource @emotion/react */
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@emotion/react'

const buttonCss = css`
  align-items: center;
  border: 5px solid #000;
  border-radius: 5px;
  display: flex;
  height: 50px;
  justify-content: center;
  width: 50px;
`

export default function MenuButton({ isOpen, onClick }) {
  const Icon = isOpen ? faXmark : faBars

  return (
    <button name={`${isOpen ? 'close' : 'open'}-menu`} css={buttonCss} onClick={onClick}>
      <FontAwesomeIcon icon={Icon} size="2x" />
    </button>
  )
}