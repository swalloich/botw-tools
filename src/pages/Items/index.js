import React from 'react'
import { LayoutBand } from '../../common/components'
import useItems from '../../common/hooks/useItems'
import ItemDataGrid from './ItemDataGrid'

function Items(props) {
  const { data } = useItems()

  return (
    <LayoutBand>
      <h1>Items</h1>
      <ItemDataGrid />
    </LayoutBand>
  )
}

export default Items
