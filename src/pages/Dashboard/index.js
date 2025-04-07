import React from 'react'
import { NavLink } from 'react-router'
import {
  ArmorGroup,
  ItemDataGrid,
  LayoutBand,
  useArmorState,
  useItemState
} from '../../common/components'

export default function Dashboard() {
  const { armorState } = useArmorState()
  const { itemState, setQty } = useItemState()
  const { data: armorData, inInventory } = armorState
  const { data: itemData, possessedItems } = itemState

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

  const itemIdList = Object.entries(favorited)
    .reduce((acc, [armorId, level]) => {
      const itemList = armorData.find((item) => item._id === armorId)?.upgrades[level]?.materials || []
      itemList.forEach((item) => {
        const itemId = itemData.find((i) => i.slug === item.id)?._id
        if (itemId && !acc.includes(itemId)) {
          acc.push(itemId)
        }
      })
      return acc
    }, [])
  const customItemState = {
    ...itemState,
    loading: armorState.loading || itemState.loading,
    error: armorState.error || itemState.error,
    data: itemData.filter((item) => itemIdList.includes(item._id)),
    possessedItems: itemIdList.reduce((acc, itemId) => {
      acc[itemId] = possessedItems[itemId] || 0
      return acc
    }, {}),
  }

  return (
    <LayoutBand>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard! Here you can manage your armor collection, perform upgrades, and easily see what items you need!</p>
      <h2>Favorited Armor</h2>
      {hasFavoritedArmor ? (
        <>
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
          <h2>Relevant Items</h2>
          <ItemDataGrid itemState={customItemState} setQty={setQty} />
        </>
      ) : (
        <p>No favorited armor found. You can add favorites on the {<NavLink to="/armor">armor page</NavLink>}</p>
      )}
    </LayoutBand>
  )
}
