import { useRef } from "react"
import Game from "../engine"

export function useGame() {
  const gameRef = useRef<Game>()
  if (!gameRef.current) {
    gameRef.current = new Game()
  }
  return gameRef.current
}