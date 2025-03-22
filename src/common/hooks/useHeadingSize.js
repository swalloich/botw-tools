/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const headingSizes = {
  1: '2em',
  2: '1.5em',
  3: '1.17em',
  4: '1em',
  5: '0.83em',
  6: '0.67em'
}

/**
 * used to set the font size of a heading to the equivalent of the given heading level
 * @param {*} param0.size - the heading level to set the font size to
 * @returns {string} - the font size to apply to the heading
 */
export default function useHeadingSize({ size }) {
  if (!size) return null
  return `font-size: ${headingSizes[size]};`
}