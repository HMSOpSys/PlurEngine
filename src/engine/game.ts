import MainLoop from 'mainloop.js'

export class Game{
  public ticksSinceStart: number = 0
  private loop: MainLoop
  private MAX_FPS: number = 10

  constructor() {
    this.loop = MainLoop.setUpdate(this.update).setMaxAllowedFPS(this.MAX_FPS)
  }

  public start = () => this.loop.start()

  public stop = () => this.loop.stop()

  public get isRunning(): boolean {
    return this.loop && this.loop.isRunning()
  }

  private update = (_delta) => {
    this.ticksSinceStart++
  }
}
