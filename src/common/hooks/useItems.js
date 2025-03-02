import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { getApiBase, getLocalStorageJSON } from './utilities'

function useItems() {
  const [possessedItems, setTrackedItemIds] = useState(getLocalStorageJSON('trackedItemIds') || {})
  const [itemData, setItemData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${getApiBase()}/items`)
      .then((repsonse) => {
        setLoading(false)
        setItemData(repsonse.data)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }, [])

  /**
   * Sets the quantity of an item in the inventory. If the quantity is 0, the item is removed from the inventory.
   * @param {string} itemId The ID of the item to set the quantity of.
   * @param {number} qty The quantity of the item in the inventory.
   * @returns {void}
   */
  const setQty = useCallback((itemId, qty) => {
    if (qty <= 0) {
      const newTrackedItemIds = { ...possessedItems }
      delete newTrackedItemIds[itemId]
      setTrackedItemIds(newTrackedItemIds)
      localStorage.setItem('trackedItemIds', JSON.stringify(newTrackedItemIds))
    } else {
      setTrackedItemIds({ ...possessedItems, [itemId]: qty })
      localStorage.setItem('trackedItemIds', JSON.stringify({ ...possessedItems, [itemId]: qty }))
    }
  }, [possessedItems, setTrackedItemIds])

  return { data: itemData, loading, error, possessedItems, setQty }
}

export default useItems