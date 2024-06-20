import MainLoop from 'mainloop.js'


const MAX_FPS: number = 10

export let ticksSinceStart: number = 0

export type FullStore = {
  
}

export const initGame = (store: FullStore) => {
  MainLoop.setUpdate(update).setMaxAllowedFPS(MAX_FPS)
}

const update = (delta) => {
  ticksSinceStart++
  console.log(delta)
}

export const startGame = () => MainLoop.start()

export const stopGame = () => MainLoop.stop()