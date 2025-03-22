/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'
import { useCallback } from 'react'
import { Card, Heading, IconButton } from '.'
import { useHeadingSize } from '../hooks'

function ItemCard({ headingLevel = 2, headingSize, data, qty, setQty }) {
  const headingSizeValue = useHeadingSize({ size: headingSize })
  const handleAdd = useCallback(() => {
    setQty(qty + 1)
  }, [setQty, qty])

  const handleRemove = useCallback(() => {
    setQty(qty - 1)
  }, [setQty, qty])

  return (
    <Card hAlign="center">
      <div
        css={
          css`
            display: flex;
            align-items: center;
          `
        }
      >
        <div css={css`margin-right: 0.85rem;`}>
          <p>{qty}</p>
        </div>
        <div
          css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-right: 0.85rem;

          button:first-of-type {
            margin-bottom: 0.5rem;
          }
        `}
        >
          <IconButton icon={faCaretUp} onClick={handleAdd} />
          <IconButton icon={faCaretDown} onClick={handleRemove} />
        </div>
        <img src="https://placehold.co/50" alt="" />
      </div>
      <Heading
        css={css`
          margin-top: 0.35rem;
          margin-bottom: 0;
          text-align: center;
          ${headingSize ? `${headingSizeValue}` : ''}
        `}
        level={headingLevel}
      >
        {data?.displayName}
      </Heading>
    </Card >
  )
}

ItemCard.propTypes = {
  headingLevel: propTypes.number,
  data: propTypes.shape({
    displayName: propTypes.string.isRequired,
  }).isRequired,
  qty: propTypes.number.isRequired,
  setQty: propTypes.func.isRequired,
}

export default ItemCard