import axios from 'axios'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { getApiBase, getLocalStorageJSON } from '../hooks/utilities'

const initialState = {
  data: [],
  loading: true,
  error: null,
  inInventory: getLocalStorageJSON('inInventory') || {},
  favorited: getLocalStorageJSON('favoritedArmor') || {}
}

function armorReducer(state, action) {
  return { ...state, ...action }
}

const ArmorContext = createContext()

export function ArmorProvider({ children }) {
  const [armorState, armorDispatch] = useReducer(armorReducer, initialState)
  const { inInventory } = armorState

  useEffect(() => {
    axios.get(`${getApiBase()}/armor`)
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
  }, [])

  /**
   * Sets an armor item as tracked.
   * @param {string} armorId The ID of the armor item to track.
   * @returns {void}
   */
  const trackArmor = useCallback((armorId) => {
    if (inInventory[armorId] !== undefined) return
    armorDispatch({ inInventory: { ...inInventory, [armorId]: 0 } })
    localStorage.setItem('inInventory', JSON.stringify({ ...inInventory, [armorId]: { level: 0 } }))
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

  const updateArmorLevel = useCallback((armorId, level) => {
    if (inInventory[armorId] === undefined) return
    if (level < 0) level = 0
    if (level > 4) level = 4
    const newinInventory = { ...inInventory }
    newinInventory[armorId] = level
    armorDispatch({ inInventory: newinInventory })
    localStorage.setItem('inInventory', JSON.stringify(newinInventory))
  }, [armorDispatch, inInventory])

  const providerValues = useMemo(() => {
    return [armorState, trackArmor, untrackArmor, updateArmorLevel]
  }, [armorState, trackArmor, untrackArmor, updateArmorLevel])

  return (
    <ArmorContext.Provider value={providerValues}>
      {children}
    </ArmorContext.Provider>
  )
}

export const useArmorState = () => useContext(ArmorContext)