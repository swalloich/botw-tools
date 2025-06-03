/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import LayoutBand from '../LayoutBand'
import NavBar from '../NavBar'
import HeaderFooterWrapper from './HeaderFooterWrapper'
import useDeviceWidth from '../../hooks/useDeviceWidth'

const headerCss = css`
  &[data-is-mobile] {
    overflow-x: clip;
    position: sticky;
    top: -1px;
  }
`

const layoutBandCss = css`
  align-items: center;
  gap: 1rem;
  position: relative;

  &[data-is-mobile] {
    justify-content: space-between;
  }
`


export default function Header({ children, links, ...props }) {
  const { atWidth } = useDeviceWidth()
  const dataIsMobile = atWidth({ default: '', sm: undefined })
  return (
    <HeaderFooterWrapper css={headerCss} data-is-mobile={dataIsMobile} Element='header' {...props}>
      <LayoutBand css={layoutBandCss} data-is-mobile={dataIsMobile} direction='row'>
        <img src="https://placehold.co/50x50" alt="" width={50} height={50} />
        <NavBar links={links} />
      </LayoutBand>
    </HeaderFooterWrapper>
  )
}