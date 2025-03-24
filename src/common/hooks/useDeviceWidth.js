import { useState, useEffect } from 'react'

class Breakpoint {
  constructor(value, name) {
    this.value = value
    this.name = name
  }

  equals(other) {
    if (other instanceof Breakpoint) {
      return this.value === other.value && this.name === other.name
    } else if (typeof other === 'number' || other instanceof Number) {
      return this.value === other
    } else {
      throw new TypeError('Breakpoint.equals() requires a Breakpoint or Number')
    }
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

function debounce(func, wait) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

function useViewportWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  const [breakpoint, setBreakpoint] = useState(widthBreakpoints.xs)

  useEffect(() => {
    const handleResize = debounce(() => setWidth(window.innerWidth), 200)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    let greatest = widthBreakpoints.xs
    Object.entries(widthBreakpoints).forEach(([, value]) => {
      if (value.lte(width) && value.gt(greatest)) {
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
export default function useDeviceWidth() {
  const currentWidth = useViewportWidth()

  const atWidth = (values) => {
    if (currentWidth) {
      const breakpoints = Object.keys(values).filter(key => key !== 'default')
      let selectedBreakpoint = 'default'

      for (const breakpoint of breakpoints) {
        if (widthBreakpoints[breakpoint].lte(currentWidth)) {
          if (selectedBreakpoint === 'default' || widthBreakpoints[selectedBreakpoint].lt(widthBreakpoints[breakpoint])) {
            selectedBreakpoint = breakpoint
          }
        }
      }
      return values[selectedBreakpoint]
    } else {
      return values.default
    }
  }

  return { atWidth, currentWidth }
}