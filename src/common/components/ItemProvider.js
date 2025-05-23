import axios from 'axios'
import { getApiBase, getLocalStorageJSON } from '../hooks/utilities'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'

const initialState = {
  data: [],
  loading: true,
  error: null,
  possessedItems: getLocalStorageJSON('trackedItemIds') || {},
}

function itemReducer(state, action) {
  return { ...state, ...action }
}

const ItemContext = createContext()

export function ItemProvider({ children }) {
  const [itemState, itemDispatch] = useReducer(itemReducer, initialState)

  /**
  * Sets the quantity of an item in the inventory. If the quantity is 0, the item is removed from the inventory.
  * @param {string} itemId The ID of the item to set the quantity of.
  * @param {number} qty The quantity of the item in the inventory.
  * @returns {void}
  */
 const setQty = useCallback((itemId, qty) => {
   const { possessedItems } = itemState
   if (qty <= 0) {
     const newTrackedItemIds = { ...possessedItems }
     delete newTrackedItemIds[itemId]
     itemDispatch({
       possessedItems: newTrackedItemIds
     })
     localStorage.setItem('trackedItemIds', JSON.stringify(newTrackedItemIds))
   } else {
     itemDispatch({
       possessedItems: { ...possessedItems, [itemId]: qty }
     })
     localStorage.setItem('trackedItemIds', JSON.stringify({ ...possessedItems, [itemId]: qty }))
   }
 }, [itemState])

  const hasItems = useCallback((upgradeData) => {
    const { data, possessedItems } = itemState
    // Get ids since the api gives slugs instead of ids.
    // add them as properties to the materialsObject with their qty as value.
    const materialsObject = {}
    if (upgradeData?.materials) {
      upgradeData.materials.forEach((material) => {
        const item = data.find((item) => item.slug === material.id)
        if (item) {
          materialsObject[item._id] = material.quantity
        }
      })
    }
    // check if possessedItems has all the items in materialsObject
    // in a quantity greater than or equal to the quantity in materialsObject.
    const hasAllItems = Object.entries(materialsObject)
      .every(([itemId, qty]) => {
        const possessedQty = possessedItems[itemId] || 0
        return possessedQty >= qty
      })
    return [hasAllItems, materialsObject]
  }, [itemState])

  const providerValues = useMemo(() => {
    return { hasItems, itemState, itemDispatch, setQty }
  }, [hasItems, itemState, setQty])

  useEffect(() => {
    axios.get(`${getApiBase()}/items`)
      .then((repsonse) => {
        itemDispatch({
          data: repsonse.data,
          loading: false
        })
      })
      .catch((error) => {
        itemDispatch({
          loading: false,
          error
        })
      })
  }, [])

  return (
    <ItemContext.Provider value={providerValues}>
      {children}
    </ItemContext.Provider>
  )
}

export function useItemState() {
  const context = useContext(ItemContext)
  if (!context) {
    throw new Error('useItemState must be used within an ItemProvider')
  }
  return context
}