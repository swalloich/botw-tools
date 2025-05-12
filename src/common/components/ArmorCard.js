/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar as solidStar, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { Card, Heading, Row, IconButton, useArmorState, useItemState } from '.'
import { useDeviceWidth } from '../hooks'

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

function ArmorCard({ data, headingLevel = 3, isTracked, isFavorited }) {
  const { addFavorite, armorState, removeFavorite, setArmorLevel, trackArmor, untrackArmor } = useArmorState()
  const { itemState, hasItems, itemDispatch } = useItemState()
  const { atWidth } = useDeviceWidth()
  const { level, favorited } = armorState.inInventory[data._id] || {}
  const { data: itemData } = itemState

  const handleFavoriteClick = useCallback(() => {
    if (isFavorited) {
      removeFavorite(data._id)
    } else {
      addFavorite(data._id)
    }
  }, [addFavorite, data._id, isFavorited, removeFavorite])

  const handleInventoryClick = useCallback(() => {
    if (isTracked) {
      untrackArmor(data._id)
    } else {
      trackArmor(data._id)
    }
  }, [data._id, isTracked, trackArmor, untrackArmor])

  const toggleInventoryPresence = <button onClick={handleInventoryClick}>{isTracked ? 'Remove' : 'Add'}</button>
  const narrowValue = atWidth({ default: null, md: '', lg: null }) // '' creates a valueless attribute in the DOM

  const nameLevelCss = css`
    display: flex;
    flex-direction: column;
    flex: 1 0;
    margin-inline-end: 0.5rem;

    &[narrow] {
      flex-direction: ${isTracked ? 'column-reverse' : 'column'};
      margin-inline-end: 0;
    }
  `

  const [hasNextUpgrade, materialsObject] = itemData?.length > 0 ? hasItems(data?.upgrades[level]) : [false, {}]
  const upgradeProps = {
    disabled: hasNextUpgrade ? false : true
  }

  const performUpgrade = useCallback(() => {
    if (hasNextUpgrade) {
      const newPossessedItems = { ...itemState.possessedItems }
      Object.entries(materialsObject).forEach(([id, qty]) => {
        if (newPossessedItems[id]) {
          newPossessedItems[id] -= qty
        }
      })
      itemDispatch({ possessedItems: newPossessedItems })
      localStorage.setItem('trackedItemIds', JSON.stringify(newPossessedItems))
      setArmorLevel(data._id, level + 1)
    }
  }, [data._id, hasNextUpgrade, itemDispatch, itemState.possessedItems, level, materialsObject, setArmorLevel])

  return (
    <Card>
      <div css={mainRowCss} narrow={narrowValue}>
        <div css={nameLevelCss} narrow={narrowValue}>
          {isTracked && <ArmorLevel level={level || 0} updateLevel={(newLevel) => setArmorLevel(data._id, newLevel)} />}
          <Heading css={headingCss} level={headingLevel} narrow={narrowValue}>{data?.displayName}</Heading>
          {!isTracked && toggleInventoryPresence}
        </div>
        <img src="https://placehold.co/75" alt="" />
      </div>
      {isTracked && (
        <div css={buttonRowCss} narrow={narrowValue}>
          <button {...upgradeProps} onClick={performUpgrade}>Upgrade</button>
          <div className='button-group' narrow={narrowValue}>
            <button onClick={handleFavoriteClick}>
              {favorited ? 'Unfavorite' : 'Favorite'}
            </button>
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
    <Row justify='space-between'>
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