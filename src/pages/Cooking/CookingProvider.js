import axios from 'axios'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { useItemState } from '../../common/components'

const initialState = {
  recipe: window.sessionStorage.getItem('recipe') ? JSON.parse(window.sessionStorage.getItem('recipe')) : null
}

function cookingReducer(state, action) {
  return { ...state, ...action }
}

const CookingContext = createContext()

export function CookingProvider({ children }) {
  const { itemState, itemDispatch } = useItemState()
  const { possessedItems } = itemState
  const [cookingState, cookingDispatch] = useReducer(cookingReducer, initialState)

  const getRecipes = useCallback(({ desiredEffect, elixirsOnly, excludeFairies, excludeDragonParts }) => {
    axios.post(`http://localhost:8080/recipes/${desiredEffect}`, {
      elixirsOnly,
      excludeFairies,
      excludeDragonParts,
      possessedItems
    })
      .then(response => {
        cookingDispatch({ recipe: response.data })
      })
      .catch(error => {
        console.error(error)
      })
  }, [cookingDispatch, possessedItems])

  // subtract the ingredients from the recipe from the possessedItems.
  const markCooked = useCallback(() => {
    const { recipe } = cookingState
    const newPossessedItems = { ...possessedItems }
    Object.entries(recipe).forEach(([itemId, qty]) => {
      newPossessedItems[itemId] -= qty
      if (newPossessedItems[itemId] <= 0) {
        delete newPossessedItems[itemId]
      }
    })
    cookingDispatch({ recipe: null })
    itemDispatch({ possessedItems: newPossessedItems })
    window.localStorage.setItem('trackedItemIds', JSON.stringify(newPossessedItems))
  }, [cookingState, itemDispatch, possessedItems])

  const providerValues = useMemo(() => {
    return [cookingState, cookingDispatch, getRecipes, markCooked]
  }, [cookingState, cookingDispatch, getRecipes, markCooked])

  useEffect(() => {
    if (cookingState.recipe) {
      window.sessionStorage.setItem('recipe', JSON.stringify(cookingState.recipe))
    } else {
      window.sessionStorage.removeItem('recipe')
    }
  })

  return (
    <CookingContext.Provider value={providerValues}>
      {children}
    </CookingContext.Provider>
  )
}

export function useCookingState() {
  const context = useContext(CookingContext)
  if (!context) {
    throw new Error('useCookingState must be used within a CookingProvider')
  }
  return context
}