import { useEffect, useState } from 'react'
import { getArmorData } from './utilities'

function useArmor() {
  const [trackedItemIds, setTrackedItemIds] = useState([])
  const [armorData, setArmorData] = useState([])

  useEffect(() => {
    getArmorData((data) => {
      setArmorData(data)
    })
  }, [])

  return { armor: armorData }
}

export default useArmor