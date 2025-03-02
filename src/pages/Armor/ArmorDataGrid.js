import React, { useCallback } from 'react'
import { ArmorCard, Grid } from '../../common/components'
import { useArmorContext } from '../../common/components/ArmorProvider'

function ArmorDataGrid() {
  const {
    data,
    loading,
    error,
    trackArmor,
    trackingData,
    untrackArmor
  } = useArmorContext()

  const setTracking = useCallback((armorId, inInventory) => {
    if (inInventory) {
      trackArmor(armorId)
    } else {
      untrackArmor(armorId)
    }
  }, [trackArmor, untrackArmor])

  return (
    <>
      {Object.keys(trackingData).length > 0 && (
        <>
          <h2>In Inventory</h2>
          <Grid>
            {Object.entries(trackingData).map(([armorId, armorData]) => {
              const item = data.find((item) => item._id === armorId)
              return (
                <ArmorCard
                  data={item}
                  isTracked={true}
                  key={armorId}
                  setTracking={(inInventory) => setTracking(armorId, inInventory)}
                />
              )
            })}
          </Grid>
        </>
      )}
      <h2>Not In Inventory</h2>
      <Grid>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && data.map((item) => {
          const isTracked = trackingData[item._id] !== undefined
          return (
            <ArmorCard
              data={item}
              isTracked={isTracked}
              key={item._id}
              setTracking={(inInventory) => setTracking(item._id, inInventory)}
            />
          )
        }
        )}
      </Grid>
    </>
  )
}

export default ArmorDataGrid