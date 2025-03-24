import axios from 'axios'
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { getApiBase, getLocalStorageJSON } from '../hooks/utilities'

const initialState = {
  data: [],
  loading: true,
  error: null,
  trackedArmor: getLocalStorageJSON('trackedArmor') || {},
}

function armorReducer(state, action) {
  return { ...state, ...action }
}

const ArmorContext = createContext()

export function ArmorProvider({ children }) {
  const [armorState, armorDispatch] = useReducer(armorReducer, initialState)
  const { trackedArmor } = armorState

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
    if (trackedArmor[armorId] !== undefined) return
    armorDispatch({ trackedArmor: { ...trackedArmor, [armorId]: 0 } })
    localStorage.setItem('trackedArmor', JSON.stringify({ ...trackedArmor, [armorId]: { level: 0 } }))
  }, [armorDispatch, trackedArmor])

  /**
   * Untracks an armor item. data associated with the item is removed.
   * @param {string} armorId The ID of the armor item to untrack.
   * @returns {void}
   */
  const untrackArmor = useCallback((armorId) => {
    if (trackedArmor[armorId] === undefined) return
    const newtrackedArmor = { ...trackedArmor }
    delete newtrackedArmor[armorId]
    armorDispatch({ trackedArmor: newtrackedArmor })
    localStorage.setItem('trackedArmor', JSON.stringify(newtrackedArmor))
  }, [armorDispatch, trackedArmor])

  const updateArmorLevel = useCallback((armorId, level) => {
    if (trackedArmor[armorId] === undefined) return
    if (level < 0) level = 0
    if (level > 4) level = 4
    const newtrackedArmor = { ...trackedArmor }
    newtrackedArmor[armorId] = level
    armorDispatch({ trackedArmor: newtrackedArmor })
    localStorage.setItem('trackedArmor', JSON.stringify(newtrackedArmor))
  }, [armorDispatch, trackedArmor])

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