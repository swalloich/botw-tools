import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import Card from './Card'

function ArmorCard({ headingLevel = 3, data, setTracking, isTracked }) {
  const Heading = `h${headingLevel}`

  const handleClick = useCallback((event) => {
    setTracking(!isTracked)
  }, [setTracking, isTracked])

  return (
    <Card>
      <img src="https://placehold.co/50" alt="" />
      <Heading>{data?.displayName}</Heading>
      <button onClick={handleClick}>{isTracked ? 'Stop Tracking' : 'Track'}</button>
    </Card>
  )
}

ArmorCard.propTypes = {
  id: PropTypes.string.isRequired,
  inInventory: PropTypes.bool,
  toggleTracking: PropTypes.func.isRequired,
}

export default ArmorCard