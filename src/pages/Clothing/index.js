import React from 'react'
import useArmor from '../../common/hooks/useArmor'
import { ClothingCard, Grid, LayoutBand } from '../../common/components'

function Clothing(props) {
  const { armor } = useArmor()

  return (
    <LayoutBand>
      <h1>Clothing</h1>
      <Grid>
        {armor.map((armor) => (
          <ClothingCard key={armor.slug} data={armor} />
        ))}
      </Grid>
    </LayoutBand>
  )
}

export default Clothing
