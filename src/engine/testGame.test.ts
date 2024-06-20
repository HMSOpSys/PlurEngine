import { waitFor } from '@testing-library/dom'
import { Game } from './testGame'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()

  })

  afterEach(() => {
    game.stop()
  })

  it('should start the game', () => {
    game.start()
    
    waitFor(() => expect(game.isRunning).toBe(true))
  })

  it('should stop the game', () => {
    game.start()
    waitFor(() => expect(game.isRunning).toBe(true))

    game.stop()
    waitFor(() => expect(game.isRunning).toBe(false))
  })

  it('should update game ticks', () => {
    const startingTick = game.ticksSinceStart
    expect(startingTick).toBe(0)

    waitFor(() => expect(game.isRunning).toBe(true))

    waitFor(() => expect(game.ticksSinceStart).toBeGreaterThan(startingTick))
  })
})