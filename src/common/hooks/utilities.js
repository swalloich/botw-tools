import axios from 'axios'

export function getApiBase() {
  if (process.env.REACT_APP_ENV === 'development') {
    return process.env.REACT_APP_DEV_API_BASE
  }
  return process.env.REACT_APP_PROD_API_BASE
}

export function getArmorData(setState) {
  axios.get(`${getApiBase()}/armor`)
    .then((repsonse) => {
      setState(repsonse.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function getItemData(setState) {
  axios.get(`${getApiBase()}/items`)
    .then((repsonse) => {
      setState(repsonse.data)
    })
    .catch((error) => {
      console.error(error)
    })
}