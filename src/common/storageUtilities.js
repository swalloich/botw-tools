/**
 * Adds armor data to local storage.
 * @param {Object} armorData - The armor data to add to local storage.
 */
function setArmorLocal(id, level) {
  console.assert(typeof id === 'string', `Expected id to be a string, got ${typeof id}`)
  console.assert(typeof level === 'number', `Expected level to be a number, got ${typeof level}`)
  const armor = getArmorLocal()
  armor.push({ id, level })
  localStorage.setItem('botw-armor', JSON.stringify(armor))
}

function setItemLocal(itemId, qty = 1) {
  console.assert(typeof itemId === 'string', `Expected itemId to be a string, got ${typeof itemId}`)
  console.assert(typeof qty === 'number', `Expected qty to be a number, got ${typeof qty}`)
  const items = getAllItemsLocal()
  const index = items.findIndex((item) => item.id === itemId)
  if (index === -1) {
    items.push({ id: itemId, qty })
  } else {
    items[index].qty += qty
  }
  localStorage.setItem('botw-items', JSON.stringify(items))
}

/**
 * Removes armor data from local storage.
 * @param {string} armorId - The ID of the armor to remove from local storage.
 * @returns {boolean} - True if the armor was removed, false if it was not found.
 */
function removeArmorLocal(armorId) {
  console.assert(typeof armorId === 'string', `Expected armorId to be a string, got ${typeof armorId}`)
  const armor = getArmorLocal()
  const index = armor.findIndex((a) => a.id === armorId)
  if (index === -1) {
    return false
  }
  armor.splice(index, 1)
  localStorage.setItem('botw-armor', JSON.stringify(armor))
  return true
}

function removeItemLocal(itemId) {
  console.assert(typeof itemId === 'string', `Expected itemId to be a string, got ${typeof itemId}`)
  const items = getAllItemsLocal()
  const index = items.findIndex((item) => item.id === itemId)
  if (index === -1) {
    return false
  }
  items.splice(index, 1)
  localStorage.setItem('botw-items', JSON.stringify(items))
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
  if (localStorage.getItem('botw-armor')) {
    return JSON.parse(localStorage.getItem('botw-armor'))
  }
  return []
}

/**
 * Returns an object containing data for an ID from local storage.
 * @param {string} itemId - The ID of the item to get from local storage.
 * @returns {Object} - The item data from local storage.
 */
function getItemLocal(itemId) {
  console.assert(typeof itemId === 'string', `Expected itemId to be a string, got ${typeof itemId}`)
  const items = getAllItemsLocal()
  return items.find((item) => item.id === itemId)
}

function getAllItemsLocal() {
  if (localStorage.getItem('botw-items')) {
    return JSON.parse(localStorage.getItem('botw-items'))
  }
  return []
}

export { getArmorLocal, getItemLocal, getAllItemsLocal, removeArmorLocal, removeItemLocal, setArmorLocal, setItemLocal }