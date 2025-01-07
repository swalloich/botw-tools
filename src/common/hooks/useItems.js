import { useCallback, useState } from 'react'
import { setItemLocal, removeItemLocal } from '../storageUtilities'

function useItems() {
  const [trackedItems, setTrackedItems] = useState([])

  const trackItem = useCallback((itemId, qty) => {
    setItemLocal(itemId, qty)
    setTrackedItems({...trackedItems, itemId: { qty }})
  }, [trackedItems])

  const untrackItem = useCallback((itemId) => {
    removeItemLocal(itemId)
    setTrackedItems((prev) => {
      const next = { ...prev }
      delete next[itemId]
      return next
    })
  }, [])

  const updateTrackedItem = useCallback((itemId, qty) => {
    setItemLocal(itemId, qty)
    setTrackedItems((prev) => {
      const next = { ...prev }
      next[itemId].qty = qty
      return next
    })
  }, [])

  return {
    items: trackedItems,
    trackItem,
    untrackItem,
    updateTrackedItem,
  }
}

export default useItems