import { useRef } from "react"
import Game from "../engine"

function useGame() {
  const gameRef = useRef()
  if (!gameRef.current) {
    gameRef.current = new Game()
  }
  return gameRef.current
}