import { useCallback, useState } from 'react'
import { addArmorLocal, getArmorLocal, removeArmorLocal } from './storage'
import armorData from '../data/armor.json'

function useArmor() {
  const [armor, setArmor] = useState()
  armorData.map((armor) => {
    const localArmor = getArmorLocal(armor.id)
    return {
      ...armor,
      ...localArmor,
    }
  })

  const addArmor = useCallback((armorData) => {
    addArmorLocal(armorData)
    setArmor((prevArmor) => [...prevArmor, armorData])
  }, [])

  const removeArmor = useCallback((armorId) => {
    const removed = removeArmorLocal(armorId)
    if (removed) {
      setArmor((prevArmor) => prevArmor.filter((a) => a.id !== armorId))
    }
  }, [])

  // update armor data about a specific armor piece
  const updateArmor = useCallback((armorData) => {
    const updatedArmor = armor.map((a) => {
      if (a.id === armorData.id) {
        return {
          ...a,
          ...armorData,
        }
      }
      return a
    })
    setArmor(updatedArmor)
  }, [armor])

  return { armor, addArmor, removeArmor, updateArmor }
}

export { useArmor }