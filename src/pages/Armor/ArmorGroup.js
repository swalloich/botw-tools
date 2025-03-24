import React from 'react'
import PropTypes from 'prop-types'
import { ArmorCard, Grid, Heading, useArmorState } from '../../common/components'
import { useDeviceWidth } from '../../common/hooks'

export default function ArmorGroup({ armorData, groupName, headingLevel=3, setTracking, ...props }) {
  const [armorState] = useArmorState()
  const { trackedArmor } = armorState
  const title = groupName || armorData.setId

  return (
    <div>
      <Heading level={headingLevel} {...props}>{title}</Heading>
      <Grid columns={useDeviceWidth({ default: 1, md: 3 })} {...props}>
        {armorData.items.map((item) => {
          const trackItem = (inInventory) => setTracking(item._id, inInventory)
          const isTracked = trackedArmor[item._id] !== undefined
          const currentLevel = trackedArmor[item._id]?.level || 0
          return <ArmorCard data={item} isTracked={isTracked} key={item._id} level={currentLevel} setTracking={trackItem} />
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
  setTracking: PropTypes.func,
}