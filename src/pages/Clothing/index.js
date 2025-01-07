/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import LayoutBand from '../../common/components/LayoutBand'
import useArmor from '../../common/hooks/useArmor'
import ClothingCard from '../../common/components/ClothingCard'

function Clothing(props) {
  const { allArmor } = useArmor()
  return (
    <LayoutBand>
      <h1>Clothing</h1>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 20px;
        `
      }>
        {Object.keys(allArmor).map((armorId) => {
          return <ClothingCard key={armorId} id={armorId} />
        })}
      </div>
    </LayoutBand>
  )
}

export default Clothing
