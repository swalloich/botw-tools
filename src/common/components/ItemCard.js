/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'
import { useCallback } from 'react'
import { Card, Heading, IconButton } from '.'
import { useHeadingSize } from '../hooks'

function ItemCard({ headingLevel = 2, headingSize, data, qty, readOnly, setQty }) {
  const headingSizeValue = useHeadingSize({ size: headingSize })
  const handleAdd = useCallback(() => {
    setQty(qty + 1)
  }, [setQty, qty])

  const handleRemove = useCallback(() => {
    setQty(qty - 1)
  }, [setQty, qty])

  return (
    <Card hAlign="center" padding='small'>
      <div
        css={
          css`
            display: flex;
            align-items: center;

            & :not(:last-child) {
              margin-right: 0.15rem;
            }
          `
        }
      >
        <p>{qty}</p>
        {!readOnly && (
          <div
            css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            button:first-of-type {
              margin-bottom: 0.15rem;
            }
          `}
          >
            <IconButton icon={faCaretUp} onClick={handleAdd} />
            <IconButton icon={faCaretDown} onClick={handleRemove} />
          </div>
        )}

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