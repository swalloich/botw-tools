import { useCallback, useState } from 'react'
import { addArmorLocal, getArmorLocal, removeArmorLocal } from '../storage'
import armorData from '../data/armor.json'

function useArmor() {
  const [trackedArmor, setTrackedArmor] = useState(getArmorLocal())

  const trackArmor = useCallback((armorId) => {
    const armor = armorData.find((a) => a.id === armorId)
    if (!armor) {
      return
    }
    addArmorLocal(armor)
    setTrackedArmor(getArmorLocal())
  }, [])

  const untrackArmor = useCallback((armorId) => {
    removeArmorLocal(armorId)
    setTrackedArmor(getArmorLocal())
  }, [])

  const updateTrackedArmor = useCallback((id, level) => {
    const armor = armorData.find((a) => a.id === id)
    if (!armor) {
      return
    }
    armor.level = level
    addArmorLocal(armor)
    setTrackedArmor(getArmorLocal())
  }, [])

  return {
    armor: trackedArmor,
    trackArmor,
    untrackArmor,
    updateTrackedArmor,
  }
}

export { useArmor }