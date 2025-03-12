/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'
import { useCallback } from 'react'
import { Card, Heading, IconButton } from '.'

function ItemCard({ headingLevel = 3, data, qty, setQty }) {
  const handleAdd = useCallback(() => {
    setQty(qty + 1)
  }, [setQty, qty])

  const handleRemove = useCallback(() => {
    setQty(qty - 1)
  }, [setQty, qty])

  return (
    <Card>
      <div
        css={
          css`
            display: flex;
            align-items: center;
          `
        }
      >
        <div
          css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-right: 1rem;

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
          margin: 0.25rem 0 0.5rem 0;
        `}
        level={headingLevel}
      >
        {data?.displayName}
      </Heading>
      <p
        css={css`
          margin: 0;
        `}
        className='my-1'>Quantity: {qty}</p>
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