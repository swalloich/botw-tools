import React from 'react'

function Clothing(props) {
  const { ...rest } = props
  return (
    <div {...rest}>
      <h1>Clothing</h1>
    </div>
  )
}

export default Clothing
