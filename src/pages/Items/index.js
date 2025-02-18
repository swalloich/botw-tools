import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import LayoutBand from '../../common/components/LayoutBand'
import useItems from '../../common/hooks/useItems'

const gridCss = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`

function Items(props) {
  const { items } = useItems()

  return (
    <LayoutBand>
      <h1>Items</h1>
      <div css={gridCss}>
        {items.map((item) => (
          <div key={item.slug}>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </LayoutBand>
  )
}

export default Items
