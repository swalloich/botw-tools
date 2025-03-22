import React from 'react'
import { ItemCard, Grid, useItemContext } from '../../common/components'
import useDeviceWidth from '../../common/hooks/useDeviceWidth'

function ItemDataGrid() {
  const {
    data,
    loading,
    error,
    possessedItems,
    setQty
  } = useItemContext()

  return (
    <Grid columns={useDeviceWidth({ default: 1, sm: 3, md: 4, xl: 6 })}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && data.map((item) => {
        const qty = possessedItems[item._id] || 0
        return (
          <ItemCard
            data={item}
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