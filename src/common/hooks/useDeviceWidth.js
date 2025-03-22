import { useState, useEffect } from 'react'

class Breakpoint {
  constructor(value, name) {
    this.value = value
    this.name = name
  }

  gt(other) {
    if (other instanceof Breakpoint) {
      return this.value > other.value
    } else if (typeof other === 'number' || other instanceof Number) {
      return this.value > other
    } else {
      throw new TypeError('Breakpoint.gt() requires a Breakpoint or Number')
    }
  }

  lt(other) {
    if (other instanceof Breakpoint) {
      return this.value < other.value
    } else if (typeof other === 'number' || other instanceof Number) {
      return this.value < other
    } else {
      throw new TypeError('Breakpoint.lt() requires a Breakpoint or Number')
    }
  }

  lte(other) {
    if (other instanceof Breakpoint) {
      return this.value <= other.value
    } else if (typeof other === 'number' || other instanceof Number) {
      return this.value <= other
    } else {
      throw new TypeError('Breakpoint.lte() requires a Breakpoint or Number')
    }
  }
}

const widthBreakpoints = {
  xs: new Breakpoint(0, 'xs'),
  sm: new Breakpoint(576, 'sm'),
  md: new Breakpoint(768, 'md'),
  lg: new Breakpoint(992, 'lg'),
  xl: new Breakpoint(1200, 'xl'),
  xxl: new Breakpoint(1400, 'xxl')
}

export function useViewportWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  const [breakpoint, setBreakpoint] = useState(widthBreakpoints.xs)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let greatest = widthBreakpoints.xs
    Object.entries(widthBreakpoints).forEach(([_, value]) => {
      if (value.lte(width)) {
        greatest = value
      }
    })
    setBreakpoint(greatest)
  }, [width])

  return breakpoint
}

/**
 * Returns a value based on the current device width.
 * @param {Object} breakpoints - An object containing values with the nams of the breakpoints, and the value to return when the device width is greater than the breakpoint.
 * @returns {String} - The value associated with the breakpoint greatest breakpoint that the device width is greater than or equal to.
 */
export default function useDeviceWidth(breakpointValues) {
  const currentWidth = useViewportWidth()

  if (currentWidth) {
    const usedBreakpoints = Object.keys(breakpointValues).filter(key => key !== 'default')
    let selectedBreakpoint = 'default'
  
    for (const breakpoint of usedBreakpoints) {
      if (widthBreakpoints[breakpoint].lte(currentWidth)) {
        if (selectedBreakpoint === 'default' || widthBreakpoints[selectedBreakpoint].lt(widthBreakpoints[breakpoint])) {
          selectedBreakpoint = breakpoint
        }
      }
    }
    return breakpointValues[selectedBreakpoint]
  } else {
    return breakpointValues.default
  }
}