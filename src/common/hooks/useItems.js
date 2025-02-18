import { useEffect, useState } from 'react'
import { getItemData } from '../utilities'

function useItems() {
  const [trackedItemIds, setTrackedItemIds] = useState([])
  const [itemData, setItemData] = useState([])

  useEffect(() => {
    getItemData((data) => {
      setItemData(data)
    })
  }, [])

  return { items: itemData }
}

export default useItems