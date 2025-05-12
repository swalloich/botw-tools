import LayoutBand from '../LayoutBand'
import NavBar from '../NavBar'
import HeaderFooterWrapper from "./HeaderFooterWrapper"


export default function Header({ children, links, ...props }) {
  return (
    <HeaderFooterWrapper Element='header' {...props}>
      <LayoutBand direction='row'>
        <img src="https://placehold.co/50x50" alt="" width={50} height={50} />
        <NavBar links={links} />
      </LayoutBand>
    </HeaderFooterWrapper>
  )
}