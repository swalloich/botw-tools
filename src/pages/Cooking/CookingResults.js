/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useCookingState } from './CookingProvider'
import { ItemCard, useItemState } from '../../common/components'

export default function CookingResults() {
  const [cookingState,,, markCooked] = useCookingState()
  const { recipe } = cookingState
  const { itemState } = useItemState()
  const { data } = itemState

  const recipeItemTotal = Object.values(recipe || {}).reduce((acc, qty) => acc + qty, 0)
  if (!recipe) {
    return null
  }
  if (recipeItemTotal === 0) {
    return <p>Sorry, no recipes found.</p>
  }
  return (
    <section>
      <h2>Results</h2>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        `}
      >
        {Object.entries(recipe).map((item) => {
          const [id, qty] = item
          const itemData = data.find(item => item._id === id)
          return (
            <ItemCard
              key={id}
              data={itemData}
              headingSize={4}
              qty={qty}
              readOnly
            />
          )
        })}
      </div>
      <button onClick={markCooked}>I cooked it</button>
    </section>
  )
}