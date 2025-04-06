import React from 'react'
import PropTypes from 'prop-types'
import { ArmorCard, Grid, Heading, useArmorState } from '.'
import { useDeviceWidth } from '../hooks'

export default function ArmorGroup(props) {
  const {
    armorData,
    groupName,
    headingLevel=3,
    ...extraProps
  } = props
  const { armorState } = useArmorState()
  const { atWidth } = useDeviceWidth()
  const { inInventory } = armorState
  const title = groupName || armorData.setId

  return (
    <div>
      <Heading level={headingLevel} {...extraProps}>{title}</Heading>
      <Grid columns={atWidth({ default: 1, md: 3 })} {...extraProps}>
        {armorData.items.map((item) => {
          const isFavorited = inInventory[item._id]?.favorited
          const isTracked = inInventory[item._id]?.level !== undefined
          const currentLevel = inInventory[item._id]?.level || 0
          return (
            <ArmorCard
              data={item}
              isFavorited={isFavorited}
              isTracked={isTracked}
              key={item._id}
              level={currentLevel}
            />
          )
        })}
      </ Grid>
    </ div>
  )
}

ArmorGroup.propTypes = {
  armorData: PropTypes.shape({
    setId: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  groupName: PropTypes.string,
  headingLevel: PropTypes.number,
}