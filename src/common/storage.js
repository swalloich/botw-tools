/**
 * Adds armor data to local storage.
 * @param {Object} armorData - The armor data to add to local storage.
 */
function addArmorLocal(armorData) {
  const armor = getArmorLocal()
  armor.push(armorData)
  localStorage.setItem('botw-armor', JSON.stringify(armor))
}

/**
 * Removes armor data from local storage.
 * @param {string} armorId - The ID of the armor to remove from local storage.
 * @returns {boolean} - True if the armor was removed, false if it was not found.
 */
function removeArmorLocal(armorId) {
  const armor = getArmorLocal()
  const index = armor.findIndex((a) => a.id === armorId)
  if (index === -1) {
    return false
  }
  armor.splice(index, 1)
  localStorage.setItem('botw-armor', JSON.stringify(armor))
  return true
}

/**
 * Returns an array of objects containing armor data from local storage.
 * The expexted shape of this object is:
 * {
 *    id: string,
 *    level: number,
 * }
 * @returns {Object[]} armorIds
 */
function getArmorLocal() {
  return JSON.parse(localStorage.getItem('botw-armor')) || []
}

export { addArmorLocal, getArmorLocal, removeArmorLocal }