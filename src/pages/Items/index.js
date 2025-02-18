import React from 'react'
import { Grid, LayoutBand } from '../../common/components'
import useItems from '../../common/hooks/useItems'

function Items(props) {
  const { items } = useItems()

  return (
    <LayoutBand>
      <h1>Items</h1>
      <Grid>
        {items.map((item) => (
          <div key={item.slug}>
            <h2>{item.name}</h2>
          </div>
        ))}
      </Grid>
    </LayoutBand>
  )
}

export default Items
