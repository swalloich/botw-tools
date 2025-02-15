import { useCallback, useState } from 'react'
import { setArmorLocal, getArmorLocal, removeArmorLocal } from '../utilities'
import armorData from '../data/armor.json'

function useArmor() {
  const [trackedArmor, setTrackedArmor] = useState(getArmorLocal())

  const trackArmor = useCallback((armorId) => {
    const armor = armorData[armorId]
    if (!armor) {
      return
    }
    setArmorLocal(armorId, 0)
    setTrackedArmor(getArmorLocal())
  }, [])

  const untrackArmor = useCallback((armorId) => {
    removeArmorLocal(armorId)
    setTrackedArmor(getArmorLocal())
  }, [])

  const updateTrackedArmor = useCallback((id, level) => {
    const armor = armorData[id]
    if (!armor) {
      return
    }
    armor.level = level
    setArmorLocal(id, level)
    setTrackedArmor(getArmorLocal())
  }, [])

  return {
    trackedArmor: trackedArmor,
    allArmor: armorData,
    trackArmor,
    untrackArmor,
    updateTrackedArmor,
  }
}

export default useArmor