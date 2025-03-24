/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar as solidStar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { Card, Heading, Row, IconButton, useArmorState } from '.'

function ArmorCard({ data, headingLevel=3, isTracked, setTracking }) {
  const [armorState,,, updateArmorLevel] = useArmorState()
  const { trackedArmor } = armorState
  
  const handleClick = useCallback(() => {
    setTracking(!isTracked)
  }, [setTracking, isTracked])

  const removeButton = <button onClick={handleClick}>{isTracked ? 'Remove' : 'Add'}</button>

  return (
    <Card>
      <Row justify='space-between'>
        <div css={css`margin-inline-end: 0.5rem; flex: 1 0;`}>
          {isTracked && <ArmorLevel level={trackedArmor[data._id] || 0} updateLevel={(newLevel) => updateArmorLevel(data._id, newLevel)} />}
          <Heading css={css`margin: 0.5rem 0 0.75rem 0;`} level={headingLevel}>{data?.displayName}</Heading>
          {!isTracked && removeButton}
        </div>
        <img src="https://placehold.co/75" alt="" />
      </Row>
      {isTracked && (
        <Row css={css`margin-top: 0.5rem;`} justify='space-between'>
          <button>Upgrade</button>
          {removeButton}
        </Row>
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