import React from 'react'
import { ItemCard, Grid } from '../../common/components'
import { useItemContext } from '../../common/components/ItemProvider'

function ItemDataGrid() {
  const {
    data,
    loading,
    error,
    possessedItems,
    setQty
  } = useItemContext()

  return (
    <Grid>
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