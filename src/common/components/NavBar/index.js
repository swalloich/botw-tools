/** @jsxImportSource @emotion/react */
import { useCallback } from 'react'
import { css } from '@emotion/react'
import { Link } from 'react-router'
import { useMenuState } from './NavMenuProvider'
import MenuButton from './MenuButton'

const navCss = css`
  --nav-width: 100vw;
  display: flex;

  @media (max-width: 576px) {
    --nav-width: 300px;
    --nav-buffer: 15px;

    &[data-menu-open] {
      right: 0;
    }

    background-color: var(--background-color);
    flex-direction: column;
    height: 100vh;
    right: calc((var(--nav-width) + var(--nav-buffer)) * -1);
    position: fixed;
    transition: right 0.15s ease-in-out;
    top: 100%;
    width: var(--nav-width);
  }
`
const listCss = css`
  display: flex;
  gap: 20px;
  list-style-type: none;
  margin: 0;
  padding: 0;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: end;
  }
`
const listItemCss = css`
  align-items: center;
  display: flex;

  a {
    height: fit-content;
    padding: 10px 15px;
  }
`

function NavBar({ links }) {
  const { dispatch, state: menuState } = useMenuState()

  const handleMenuClick = useCallback(() => {
    dispatch({ type: 'TOGGLE' })
  }, [dispatch])

  return (
    <div>
      {menuState.isMobile && (
        <MenuButton isOpen={menuState.isOpen} onClick={handleMenuClick} />
      )}
      <nav css={navCss} data-menu-open={menuState.isOpen ? '' : undefined}>
        <ul css={listCss}>
          {links.map((link) => (
            <li css={listItemCss} key={link.to}>
              <Link
                aria-label={`Navigate to ${link.to}${menuState.isMobile ? " and close site navigation" : ""}`}
                to={link.to}
                onClick={handleMenuClick}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar