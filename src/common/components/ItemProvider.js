import { createContext, useContext } from 'react'
import useItems from '../hooks/useItems'

const ItemContext = createContext()

export function ItemProvider({ children }) {
  const itemState = useItems()

  return (
    <ItemContext.Provider value={itemState}>
      {children}
    </ItemContext.Provider>
  )
}

export const useItemContext = () => useContext(ItemContext)