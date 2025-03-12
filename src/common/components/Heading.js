import React from 'react'

export default function Heading({ children, level = 1, ...props }) {
  return React.createElement(`h${level}`, props, children)
}