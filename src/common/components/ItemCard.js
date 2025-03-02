import propTypes from 'prop-types'
import React, { useCallback } from 'react'
import Card from './Card'

function ItemCard({ headingLevel = 3, data, qty, setQty }) {
  const Heading = `h${headingLevel}`

  const handleAdd = useCallback((event) => {
    setQty(qty + 1)
  }, [setQty, qty])

  const handleRemove = useCallback((event) => {
    setQty(qty - 1)
  }, [setQty, qty])

  return (
    <Card>
      <img src="https://placehold.co/50" alt="" />
      <Heading>{data?.name}</Heading>
      <p>Quantity: {qty}</p>
      <button onClick={handleAdd}>Increase</button>
      <button onClick={handleRemove}>Decrease</button>
    </Card>
  )
}

ItemCard.propTypes = {
  headingLevel: propTypes.number,
  data: propTypes.shape({
    displayName: propTypes.string.isRequired,
  }).isRequired,
  qty: propTypes.number.isRequired,
  setQty: propTypes.func.isRequired,
}

export default ItemCard