import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { getApiBase, getLocalStorageJSON } from './utilities'

function useArmor() {
  const [trackedArmorIds, setTrackedArmorIds] = useState(getLocalStorageJSON('trackedArmorIds') || {})
  const [armorData, setArmorData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${getApiBase()}/armor`)
      .then((repsonse) => {
        setLoading(false)
        setArmorData(repsonse.data)
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
      })
  }, [])

  /**
   * Sets an armor item as tracked.
   * @param {string} armorId The ID of the armor item to track.
   * @returns {void}
   */
  const trackArmor = useCallback((armorId) => {
    if (trackedArmorIds[armorId] !== undefined) return
    setTrackedArmorIds({ ...trackedArmorIds, [armorId]: 0 })
    localStorage.setItem('trackedArmorIds', JSON.stringify({ ...trackedArmorIds, [armorId]: { level: 0 } }))
  }, [trackedArmorIds, setTrackedArmorIds])

  /**
   * Untracks an armor item. data associated with the item is removed.
   * @param {string} armorId The ID of the armor item to untrack.
   * @returns {void}
   */
  const untrackArmor = useCallback((armorId) => {
    if (trackedArmorIds[armorId] === undefined) return
    const newTrackedArmorIds = { ...trackedArmorIds }
    delete newTrackedArmorIds[armorId]
    setTrackedArmorIds(newTrackedArmorIds)
    localStorage.setItem('trackedArmorIds', JSON.stringify(newTrackedArmorIds))
  }, [trackedArmorIds, setTrackedArmorIds])

  return { data: armorData, trackingData: trackedArmorIds, loading, error, trackArmor, untrackArmor }
}

export default useArmor