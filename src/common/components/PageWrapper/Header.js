import LayoutBand from '../LayoutBand'
import NavBar from '../NavBar'
import HeaderFooterWrapper from "./HeaderFooterWrapper"


export default function Header({ children, links, ...props }) {
  return (
    <HeaderFooterWrapper Element='header' {...props}>
      <LayoutBand direction='row'>
        <img src="https://placehold.co/150x75" alt="" width={150} height={75} />
        <NavBar links={links} />
      </LayoutBand>
    </HeaderFooterWrapper>
  )
}