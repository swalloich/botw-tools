import React from 'react'
import LayoutBand from '../../common/components/LayoutBand'
import { CookingProvider } from './CookingProvider'
import CookingForm from './CookingForm'
import CookingResults from './CookingResults'

function Cooking() {
  return (
    <CookingProvider>
      <LayoutBand>
        <h1>Cooking</h1>
        <CookingForm />
        <CookingResults />
      </LayoutBand>
    </CookingProvider>
  )
}

export default Cooking
