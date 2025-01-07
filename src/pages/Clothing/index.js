/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback } from 'react'
import LayoutBand from '../../common/components/LayoutBand'
import useArmor from '../../common/hooks/useArmor'
import ClothingCard from '../../common/components/ClothingCard'

const gridCss = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`

function Clothing(props) {
  const { allArmor, trackedArmor, trackArmor, untrackArmor } = useArmor()
  const untrackedArmor = Object.keys(allArmor).filter((armorId) => trackedArmor?.[armorId] === undefined)

  const setTracking = useCallback((armorId, isTracked) => {
    if (isTracked) {
      trackArmor(armorId)
    } else if (trackedArmor?.[armorId] !== undefined) {
      untrackArmor(armorId)
    }
  }, [trackedArmor, trackArmor, untrackArmor])

  return (
    <LayoutBand>
      <h1>Clothing</h1>
      {Object.keys(trackedArmor).length > 0 && (
        <>
          <h2>In inventory</h2>
          <div css={gridCss}>
            {Object.keys(allArmor).filter((armorId) => trackedArmor?.[armorId] !== undefined).map((armorId) => {
              const inInventory = trackedArmor?.[armorId] !== undefined
              return <ClothingCard key={armorId} id={armorId} inInventory={inInventory} setTracking={setTracking} />
            })}
          </div>
        </>
      )}
      {untrackedArmor.length > 0 && (
        <>
          <h2>Not in inventory</h2>
          <div css={gridCss}>
            {untrackedArmor.map((armorId) => {
              const inInventory = trackedArmor?.[armorId] !== undefined
              return <ClothingCard key={armorId} id={armorId} inInventory={inInventory} setTracking={setTracking} />
            })}
          </div>
        </>
      )}
    </LayoutBand>
  )
}

export default Clothing
