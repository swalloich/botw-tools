/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
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

const githubIconCss = css`
  color: #000;
`

const linkedinIconCss = css`
  color: #0b66c3;
`

const iconListCss = css`
  display: flex;
  list-style: none;
  padding: 0;
  flex-gap: 1rem;
`

export default function Footer({ baseHeaderLevel=2, ...props }) {
  const { atWidth } = useDeviceWidth()

  return (
    <HeaderFooterWrapper Element='footer' css={footerCss} {...props}>
      <LayoutBand direction='column'>
        <Grid columns={atWidth({ default: 1, md: 2 })}>
          <div>
            <Heading level={baseHeaderLevel}>Project Links</Heading>
            <ul css={iconListCss}>
              <li>
                <Link
                  aria-label="Front-end repository for this page"
                  css={githubIconCss}
                  to="https://github.com/swalloich/botw-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} size='2x' />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Heading level={baseHeaderLevel}>My Links</Heading>
            <ul css={iconListCss}>
              <li>
                <Link
                  aria-label="My GitHub profile"
                  css={githubIconCss}
                  to="https://github.com/swalloich"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} size='2x' />
                </Link>
              </li>
              <li>
                <Link
                  aria-label="My LinkedIn profile"
                  css={linkedinIconCss}
                  to="https://www.linkedin.com/in/nelsjac42/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} size='2x' />
                </Link>
              </li>
            </ul>
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