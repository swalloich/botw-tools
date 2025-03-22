import React, { useEffect } from 'react'
import EffectSelector from './EffectSelector'
import { useCookingState } from '../CookingProvider'
import { useItemState } from '../../../common/components'

export default function CookingForm() {
  const [itemState] = useItemState()
  const { loading, possessedItems } = itemState
  const [,, getRecipes] = useCookingState()

  function handleSubmit(formData) {
    const newState = {
      desiredEffect: formData.get('desired-effect'),
      elixirsOnly: formData.get('elixirs-only') === 'on',
      excludeFairies: formData.get('exclude-fairies') === 'on',
      excludeDragonParts: formData.get('exclude-dragon-parts') === 'on',
    }
    getRecipes(newState) // dispatch appears to be asynchronous, so the state may not be updated yet
  }

  const possessedItemsCount = Object.entries(possessedItems).reduce((acc, [_, qty]) => acc + qty, 0)

  return (
    <form action={handleSubmit}>
      <EffectSelector defaultEffect={'health-restore'} />
      <fieldset>
        <legend>Options (not yet implemented)</legend>
        <input type='checkbox' id='elixirs-only' name='elixirs-only' />
        <label htmlFor='elixirs-only'>Elixirs Only</label>
        <input type='checkbox' id='exclude-fairies' name='exclude-fairies' />
        <label htmlFor='exclude-fairies'>Exclude Fairies</label>
        <input type='checkbox' id='exclude-dragon-parts' name='exclude-dragon-parts' />
        <label htmlFor='exclude-dragon-parts'>Exclude Dragon Parts</label>
      </fieldset>
      {(!loading && possessedItemsCount > 0) ? (
        <button type='submit'>Get a Recipe</button>
      ) : (
        <p>It looks like you don't have any items listed in your inventory. Enter those first, then come back.</p>
      )}
    </form>
  )
}