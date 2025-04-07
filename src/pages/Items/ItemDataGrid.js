import React from 'react'
import { ItemCard, Grid, useItemState } from '../../common/components'
import { useDeviceWidth } from '../../common/hooks'

function ItemDataGrid() {
  const { atWidth } = useDeviceWidth()
  const { itemState, setQty } = useItemState()
  const {
    data,
    loading,
    error,
    possessedItems,
  } = itemState

  return (
    <Grid columns={atWidth({ default: 2, sm: 4, md: 5, lg: 6, xxl: 7 })}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && data.map((item) => {
        const qty = possessedItems[item._id] || 0
        return (
          <ItemCard
            data={item}
            headingSize={4}
            key={item.slug}
            qty={qty}
            setQty={(qty) => setQty(item._id, qty)}
          />
        )
      })}
    </Grid>
  )
}

export default ItemDataGrid