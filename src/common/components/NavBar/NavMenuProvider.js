import { createContext, useReducer, useContext } from "react"

const NavMenuContext = createContext()
const initialState = {
  isOpen: false,
}
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen }
    case "OPEN":
      return { ...state, isOpen: true }
    case "CLOSE":
      return { ...state, isOpen: false }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export function NavMenuProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <NavMenuContext.Provider value={{ state, dispatch }}>
      {children}
    </NavMenuContext.Provider>
  )
}

export const useMenuState = () => useContext(NavMenuContext)
