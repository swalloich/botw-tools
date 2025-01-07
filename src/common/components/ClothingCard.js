import PropTypes from 'prop-types'
import React from 'react'
import Card from './Card'

function ClothingCard({id, inInventory = false, setTracking}) {
  return (
    <Card>
      <img src="https://placehold.co/250" alt="" />
      <h2>{id}</h2>
      <button onClick={() => setTracking(id, !inInventory)}>{inInventory ? 'Untrack' : 'Track'}</button>
    </Card>
  )
}

ClothingCard.propTypes = {
  id: PropTypes.string.isRequired,
  inInventory: PropTypes.bool,
  toggleTracking: PropTypes.func.isRequired,
}

export default ClothingCard