import { renderHook, act, waitFor } from "@testing-library/react"
import useArmor from "../useArmor"

const mockLocalStorage = () => {
  let store = {}
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
}

describe("useArmor", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage(),
    })
  })
  it("Stores armor data", async () => {
    const { result } = renderHook(() => useArmor())
    expect(result.current.trackedArmor).toEqual({})
    act(() => {
      result.current.trackArmor("old-shirt")
    })
    await waitFor(() => {
      expect(result.current.trackedArmor).toHaveProperty('old-shirt')
    })
    expect(window.localStorage.getItem("botw-armor")).toEqual(
      JSON.stringify({ "old-shirt": 0 })
    )
  })
  it("Removes armor data", async () => {
    const { result } = renderHook(() => useArmor())
    act(() => {
      result.current.trackArmor("old-shirt")
    })
    await waitFor(() => {
      expect(result.current.trackedArmor).toHaveProperty('old-shirt', 0)
    })
    act(() => {
      result.current.untrackArmor("old-shirt")
    })
    await waitFor(() => {
      expect(result.current.trackedArmor).toEqual({})
    })
    expect(window.localStorage.getItem("botw-armor")).toEqual("{}")
  })
})