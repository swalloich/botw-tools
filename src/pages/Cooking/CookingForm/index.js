/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import EffectSelector from './EffectSelector'
import { useCookingState } from '../CookingProvider'
import { Fieldset, useItemState } from '../../../common/components'
import Row from '../../../common/components/Row'

const formCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const fieldsetCss = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export default function CookingForm() {
  const  { itemState } = useItemState()
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
    <form action={handleSubmit} css={formCss}>
      <EffectSelector css={fieldsetCss} defaultEffect={'health-restore'} />
      <Fieldset css={fieldsetCss} legend="Options (not yet implemented)">
        <label htmlFor='elixirs-only'>
          <input type='checkbox' id='elixirs-only' name='elixirs-only' />
          Elixirs Only
        </label>
        <label htmlFor='exclude-fairies'>
          <input type='checkbox' id='exclude-fairies' name='exclude-fairies' />
          Exclude Fairies
        </label>
        <label htmlFor='exclude-dragon-parts'>
          <input type='checkbox' id='exclude-dragon-parts' name='exclude-dragon-parts' />
          Exclude Dragon Parts
        </label>
      </Fieldset>
        <Row justify='center'>
          {(!loading && possessedItemsCount > 0) ? (
            <button type='submit'>Get a Recipe</button>
          ) : (
            <p>It looks like you don't have any items listed in your inventory. Enter those first, then come back.</p>
          )}
        </ Row>
    </form>
  )
}