/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router'
import useDeviceWidth from '../../hooks/useDeviceWidth'
import LayoutBand from '../LayoutBand'
import Grid from '../Grid'
import Heading from '../Heading'
import HeaderFooterWrapper from './HeaderFooterWrapper'

const footerCss = css`
  margin-top: 40px;
`

const hrCss = css`
  width: 100%;
`

export default function Footer({ baseHeaderLevel=3, ...props }) {
  const { atWidth } = useDeviceWidth()

  return (
    <HeaderFooterWrapper Element='footer' css={footerCss} {...props}>
      <LayoutBand direction='column'>
        <Grid columns={atWidth({ default: 1, md: 2 })}>
          <div>
            <Heading level={baseHeaderLevel}>Project Links</Heading>
            <div>
              <Link to="https://github.com/swalloich/botw-tools" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size='2x' />
              </Link>
            </div>
          </div>
          <div>
            <Heading level={baseHeaderLevel}>My Links</Heading>
          </div>
        </Grid>
        <hr css={hrCss} />
        <p>
          This project is an independently developed toolset for The Legend of Zelda: Breath of the Wild. It is not affiliated with or endorsed by Nintendo.
        </p>
      </LayoutBand>
    </HeaderFooterWrapper>
  )
}