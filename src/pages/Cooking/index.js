import React from 'react'

function Cooking(props) {
  const { ...rest } = props

  return (
    <div {...rest}>
      <h1>Cooking</h1>
    </div>
  )
}

export default Cooking
