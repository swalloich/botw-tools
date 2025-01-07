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
  const untrackedArmorKeys = Object.keys(allArmor).filter((armorId) => trackedArmor?.[armorId] === undefined)
  const trackedArmorKeys = Object.keys(allArmor).filter((armorId) => trackedArmor?.[armorId] !== undefined)

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
      {trackedArmorKeys.length > 0 && (
        <>
          <h2>In inventory</h2>
          <div css={gridCss}>
            {trackedArmorKeys.map((key) => {
              const data = {
                id: key,
                ...allArmor[key],
              }
              return <ClothingCard key={key} headingLevel={3} data={data} inInventory={true} setTracking={setTracking} />
            })}
          </div>
        </>
      )}
      {untrackedArmorKeys.length > 0 && (
        <>
          <h2>Not in inventory</h2>
          <div css={gridCss}>
            {untrackedArmorKeys.map((key) => {
              const data = {
                id: key,
                ...allArmor[key],
              }
              return <ClothingCard key={key} headingLevel={3} data={data} setTracking={setTracking} />
            })}
          </div>
        </>
      )}
    </LayoutBand>
  )
}

export default Clothing
