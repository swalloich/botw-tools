import React from 'react'
import LayoutBand from '../../common/components/LayoutBand'
import { ArmorGroup, useArmorState } from '../../common/components'

export default function Dashboard() {
  const { armorState } = useArmorState()
  const { data: armorData, inInventory } = armorState

  const favorited = Object.entries(inInventory)
    .filter(([_, { favorited }]) => favorited !== undefined)
    .reduce((acc, [armorId, { level }]) => {
      acc[armorId] = level
      return acc
    }, {})

  const favoritedArmorBySet = armorData
    .filter((item) => favorited[item._id] !== undefined)
    .reduce((acc, item) => {
      if (!acc[item.setId]) {
        acc[item.setId] = []
      }
      acc[item.setId].push(item)
      return acc
    }, {})
  const hasFavoritedArmor = Object.keys(favorited).length > 0

  return (
    <LayoutBand>
      <h1>Dashboard</h1>
      {hasFavoritedArmor && (
        <>
          <h2>Favorited Armor</h2>
          {favoritedArmorBySet && Object.entries(favoritedArmorBySet)
            .sort(([armorIdA], [armorIdB]) => armorIdA.localeCompare(armorIdB))
            .map(([setId, items]) => {
              return (
                <ArmorGroup
                  armorData={{ setId, items }}
                  key={setId}
                  headingLevel={3}
                />
              )
            })
          }
        </>
      )}
    </LayoutBand>
  )
}
