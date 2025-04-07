import React from 'react'
import { ItemDataGrid, LayoutBand, useItemState } from '../../common/components'

function Items() {
  const { itemState, setQty } = useItemState()
  return (
    <LayoutBand>
      <h1>Items</h1>
      <ItemDataGrid itemState={itemState} setQty={setQty} />
    </LayoutBand>
  )
}

export default Items
