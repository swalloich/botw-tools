import { createContext, useReducer, useContext, useEffect } from "react"
import useDeviceWidth from "../../hooks/useDeviceWidth"

const NavMenuContext = createContext()
const initialState = {
  isOpen: false,
  isMobile: false,
}
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen }
    case "OPEN":
      return { ...state, isOpen: true }
    case "CLOSE":
      return { ...state, isOpen: false }
    case "SET_MOBILE":
      return { ...state, isMobile: action.payload }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export function NavMenuProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { atWidth } = useDeviceWidth()
  const isMobile = atWidth({ default: true, sm: false })

  useEffect(() => {
    dispatch({ type: "SET_MOBILE", payload: isMobile })
  }, [isMobile])

  return (
    <NavMenuContext.Provider value={{ state, dispatch }}>
      {children}
    </NavMenuContext.Provider>
  )
}

export const useMenuState = () => useContext(NavMenuContext)
