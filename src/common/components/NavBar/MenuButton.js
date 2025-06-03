/** @jsxImportSource @emotion/react */
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from '@emotion/react'

const buttonCss = css`
  align-items: center;
  background-color: var(--background-color);
  border: 4px solid var(--text-color);
  border-radius: 4px;
  color: var(--text-color);
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
`

export default function MenuButton({ isOpen, onClick }) {
  const Icon = isOpen ? faXmark : faBars

  return (
    <button name={`${isOpen ? 'close' : 'open'}-menu`} css={buttonCss} onClick={onClick}>
      <FontAwesomeIcon icon={Icon} size="2x" />
    </button>
  )
}