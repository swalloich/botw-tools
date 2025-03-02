import { createContext, useContext } from "react"
import useArmor from "../hooks/useArmor"

const ArmorContext = createContext()

export function ArmorProvider({ children }) {
  const armorState = useArmor()
  return (
    <ArmorContext.Provider value={armorState}>
      {children}
    </ArmorContext.Provider>
  )
}

export const useArmorContext = () => useContext(ArmorContext)