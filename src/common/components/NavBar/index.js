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
  }
`

const listCss = css`
  display: flex;
  gap: 20px;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    align-items: center;
    display: flex;

    a {
      height: fit-content;
      padding: 10px 15px;
    }
  }

  @media (max-width: 576px) {
    &[data-menu-open] {
      margin-left: calc(var(--nav-width) * -1);
    }

    background-color: #fff;
    flex-direction: column;
    height: 100vh;
    left: 100vw;
    position: absolute;
    transition: margin-left 0.15s ease-in-out;
    top: 100%;
    width: var(--nav-width);
  }
`

function NavBar({ links }) {
  const { dispatch, state: menuState } = useMenuState()

  const handleMenuClick = useCallback(() => {
    dispatch({ type: 'TOGGLE' })
  }, [dispatch])

  return (
    <nav css={navCss}>
      {menuState.isMobile && (
        <MenuButton isOpen={menuState.isOpen} onClick={handleMenuClick} />
      )}
      <ul css={listCss} data-menu-open={menuState.isOpen ? '' : undefined} aria-hidden={!menuState.isOpen}>
        {links.map((link) => (
          <li key={link.to}>
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
  )
}

export default NavBar