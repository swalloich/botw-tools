import axios from 'axios'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { getApiBase, getLocalStorageJSON } from '../hooks/utilities'

const initialState = {
  data: [],
  loading: true,
  error: null,
  inInventory: getLocalStorageJSON('inInventory') || {},
  filteredCategories: ['amiibo', 'xenoblade'],
}

function armorReducer(state, action) {
  return { ...state, ...action }
}

const ArmorContext = createContext()

export function ArmorProvider({ children }) {
  const [armorState, armorDispatch] = useReducer(armorReducer, initialState)
  const { inInventory, filteredCategories } = armorState

  useEffect(() => {
    let queryParams = ''
    if (filteredCategories.length > 0) {
      queryParams = `?excludeSources=${filteredCategories.join(',')}`
    }
    axios.get(`${getApiBase()}/armor${queryParams}`)
      .then((repsonse) => {
        armorDispatch({
          data: repsonse.data,
          loading: false
        })
      })
      .catch((error) => {
        armorDispatch({
          loading: false,
          error
        })
      })
  }, [filteredCategories])

  const addFavorite = useCallback((armorId) => {
    const { favorited } = armorState.inInventory[armorId] || {}
    if (favorited) return
    const newArmorState = { ...armorState.inInventory, [armorId]: { ...armorState.inInventory[armorId], favorited: true } }
    armorDispatch({ inInventory: newArmorState })
    localStorage.setItem('inInventory', JSON.stringify(newArmorState))
  }, [armorState.inInventory, armorDispatch])

  const removeFavorite = useCallback((armorId) => {
    const { favorited } = armorState.inInventory[armorId] || {}
    if (!favorited) return
    const newArmorState = { ...armorState.inInventory, [armorId]: { ...armorState.inInventory[armorId], favorited: undefined } }
    armorDispatch({ inInventory: newArmorState })
    localStorage.setItem('inInventory', JSON.stringify(newArmorState))
  }, [armorState.inInventory, armorDispatch])

  /**
   * Sets an armor item as tracked.
   * @param {string} armorId The ID of the armor item to track.
   * @returns {void}
   */
  const trackArmor = useCallback((armorId) => {
    if (inInventory[armorId] !== undefined) return
    const newinInventory = { ...inInventory, [armorId]: { level: 0 } }
    armorDispatch({ inInventory: newinInventory })
    localStorage.setItem('inInventory', JSON.stringify(newinInventory))
  }, [armorDispatch, inInventory])

  /**
   * Untracks an armor item. data associated with the item is removed.
   * @param {string} armorId The ID of the armor item to untrack.
   * @returns {void}
   */
  const untrackArmor = useCallback((armorId) => {
    if (inInventory[armorId] === undefined) return
    const newinInventory = { ...inInventory }
    delete newinInventory[armorId]
    armorDispatch({ inInventory: newinInventory })
    localStorage.setItem('inInventory', JSON.stringify(newinInventory))
  }, [armorDispatch, inInventory])

  const setArmorLevel = useCallback((armorId, level) => {
    if (inInventory[armorId] === undefined) return
    if (level < 0) level = 0
    if (level > 4) level = 4
    const newinInventory = { ...inInventory }
    newinInventory[armorId] = { ...newinInventory[armorId], level }
    armorDispatch({ inInventory: newinInventory })
    localStorage.setItem('inInventory', JSON.stringify(newinInventory))
  }, [armorDispatch, inInventory])

  const providerValues = useMemo(() => {
    return { addFavorite, armorState, removeFavorite, setArmorLevel, trackArmor, untrackArmor }
  }, [addFavorite, armorState, removeFavorite, setArmorLevel, trackArmor, untrackArmor])

  return (
    <ArmorContext.Provider value={providerValues}>
      {children}
    </ArmorContext.Provider>
  )
}

export const useArmorState = () => useContext(ArmorContext)