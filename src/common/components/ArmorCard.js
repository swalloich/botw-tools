/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar as solidStar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { Card, Heading, Row, IconButton, useArmorState } from '.'
import { useDeviceWidth } from '../hooks'

function ArmorCard({ data, headingLevel=3, isTracked, setTracking }) {
  const [armorState,,, updateArmorLevel] = useArmorState()
  const { atWidth } = useDeviceWidth()
  const { inInventory } = armorState

  const mainRowCss = css`
    display: flex;
    width: 100%;

    &[narrow] {
      align-items: center;
      flex-direction: column-reverse;
    }
  `

  const headingCss = css`
    margin: 0.5rem 0 0.75rem 0;

    &[narrow] {
      text-align: center;
    }
  `

  const buttonRowCss = css`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    width: 100%;

    .button-group {
      display: flex;
      gap: 0.5rem;

      &[narrow] > * {
        flex: 1 1 50%;
      }
    }

    &[narrow] {
      flex-direction: column;
      gap: 0.5rem;
    }
  `

  const handleClick = useCallback(() => {
    setTracking(!isTracked)
  }, [setTracking, isTracked])

  const toggleInventoryPresence = <button onClick={handleClick}>{isTracked ? 'Remove' : 'Add'}</button>
  const narrowValue = atWidth({ default: null, md: '', lg: null }) // '' creates a valueless attribute in the DOM

  const nameLevelCss = css`
    display: flex;
    flex-direction: column;
    flex: 1 0;
    margin-inline-end: 0.5rem;

    &[narrow] {
      flex-direction: ${isTracked ? 'column-reverse' : 'column'};
    }
  `

  return (
    <Card>
      <div css={mainRowCss} narrow={narrowValue}>
        <div css={nameLevelCss} narrow={narrowValue}>
          {isTracked && <ArmorLevel level={inInventory[data._id] || 0} updateLevel={(newLevel) => updateArmorLevel(data._id, newLevel)} />}
          <Heading css={headingCss} level={headingLevel} narrow={narrowValue}>{data?.displayName}</Heading>
          {!isTracked && toggleInventoryPresence}
        </div>
        <img src="https://placehold.co/75" alt="" />
      </div>
      {isTracked && (
        <div css={buttonRowCss} narrow={narrowValue}>
            <button disabled>Upgrade</button>
          <div className='button-group' narrow={narrowValue}>
            <button disabled>Favorite</button>
            {toggleInventoryPresence}
          </div>
        </div>
      )}
    </Card>
  )
}

function ArmorLevel({ level, updateLevel }) {
  const solidStars = level > 0
    ? Array(level).fill(solidStar).map((icon, index) => (
      <IconButton key={index} icon={icon} onClick={() => updateLevel(index + 1)} />)
    ) : null
  const outlineStars = level < 4
    ? Array(4 - level).fill(outlineStar).map((icon, index) => (
      <IconButton key={index} icon={icon} onClick={() => updateLevel(index + level + 1)} />
    )) : null

  return (
    <Row>
      {level !== undefined && level > 0 && <IconButton icon={faCircleXmark} color='#f00' onClick={() => updateLevel(0)} />}
      {solidStars}
      {outlineStars}
    </Row>
  )
}

ArmorCard.propTypes = {
  id: PropTypes.string.isRequired,
  inInventory: PropTypes.bool,
  toggleTracking: PropTypes.func.isRequired,
}

ArmorLevel.propTypes = {
  level: PropTypes.number,
  updateLevel: PropTypes.func.isRequired,
}

export default ArmorCard