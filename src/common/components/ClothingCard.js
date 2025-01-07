import PropTypes from 'prop-types'
import React from 'react'
import Card from './Card'

function ClothingCard({headingLevel = 2, data, inInventory = false, setTracking}) {
  const Heading = `h${headingLevel}`
  return (
    <Card>
      <img src="https://placehold.co/250" alt="" />
      <Heading>{data.name}</Heading>
      <button onClick={() => setTracking(data.id, !inInventory)}>{inInventory ? 'Untrack' : 'Track'}</button>
    </Card>
  )
}

ClothingCard.propTypes = {
  id: PropTypes.string.isRequired,
  inInventory: PropTypes.bool,
  toggleTracking: PropTypes.func.isRequired,
}

export default ClothingCard