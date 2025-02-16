import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import LayoutBand from '../../common/components/LayoutBand'
import useArmor from '../../common/hooks/useArmor'
import ClothingCard from '../../common/components/ClothingCard'

const gridCss = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`

function Clothing(props) {
  const { armor } = useArmor()

  return (
    <LayoutBand>
      <h1>Clothing</h1>
      <div css={gridCss}>
        {armor.map((armor) => (
          <ClothingCard key={armor.slug} data={armor} />
        ))}
      </div>
    </LayoutBand>
  )
}

export default Clothing
