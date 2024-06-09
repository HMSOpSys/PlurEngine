import { renderHook, act, waitFor } from '@testing-library/react'
import { useGame } from './useGame'
import Game from '../engine'

describe('useGame', () => {
  it('should return a Game instance', () => {
    const { result } = renderHook(() => useGame())
    expect(result.current).toBeInstanceOf(Game)
  })

  it('should return the same Game instance on subsequent calls', () => {
    const { result, rerender } = renderHook(() => useGame())
    const game1 = result.current
    act(() => {
      rerender()
    })
    const game2 = result.current
    expect(game1).toBe(game2)
  })

  it('should show a tick difference when called from a different component', () => {  
    const { result } = renderHook(() => useGame())
    const game1 = result.current
    act(() => {
      game1.start()
    })
    waitFor(() => expect(game1.ticksSinceStart).toBeGreaterThan(0))
    const initialTick = game1.ticksSinceStart
    waitFor(() => expect(game1.ticksSinceStart).toBeGreaterThan(initialTick))
  })
})