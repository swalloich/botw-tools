import React from 'react'

function Inventory(props) {
  const { ...rest } = props

  return (
    <div {...rest}>
      <h1>Inventory</h1>
    </div>
  )
}

export default Inventory
