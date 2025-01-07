import PropTypes from 'prop-types'
import React from 'react'
import Card from './Card'

function ClothingCard({id, inInventory}) {
  return (
    <Card>
      <img src="https://placehold.co/250" alt="" />
      <h2>{id}</h2>
      <p>{!inInventory && 'Not '}{!inInventory ? 'i' : 'I'}n inventory</p>
    </Card>
  )
}

ClothingCard.propTypes = {
  id: PropTypes.string.isRequired,
  inInventory: PropTypes.bool
}

export default ClothingCard