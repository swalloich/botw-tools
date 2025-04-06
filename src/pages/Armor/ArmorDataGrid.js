import React from 'react'
import { useArmorState, ArmorGroup } from '../../common/components'

function ArmorDataGrid() {
  const { armorState, } = useArmorState()
  const { data, loading, error, inInventory: allInInventory } = armorState

  if (loading || !data) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const obtaineedArmorBySet = data
    .filter((item) => allInInventory[item._id] !== undefined)
    .reduce((acc, item) => {
      if (!acc[item.setId]) {
        acc[item.setId] = []
      }
      acc[item.setId].push(item)
      return acc
    }, {})

  const unobtainedArmorBySet = data
    .filter((item) => allInInventory[item._id] === undefined)
    .reduce((acc, item) => {
      if (!acc[item.setId]) {
        acc[item.setId] = []
      }
      acc[item.setId].push(item)
      return acc
    }, {})

  return (
    <>
      {Object.keys(allInInventory).length > 0 && (
        <>
          <h2>In Inventory</h2>
          {Object.entries(obtaineedArmorBySet)
            .sort(([armorIdA], [armorIdB]) => armorIdA.localeCompare(armorIdB))
            .map(([setId, items]) => {
              return (
                <ArmorGroup
                  armorData={{ setId, items }}
                  key={setId}
                />
              )
            })
          }
        </>
      )}
      <h2>Not In Inventory</h2>
      <>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          Object.entries(unobtainedArmorBySet)
            .sort(([setIdA], [setIdB]) => setIdA.localeCompare(setIdB))
            .map(([setId, items]) => {
              return (
                <ArmorGroup
                  armorData={{ setId, items }}
                  key={setId}
                />
              )
            })
        )}
      </>
    </>
  )
}

export default ArmorDataGrid