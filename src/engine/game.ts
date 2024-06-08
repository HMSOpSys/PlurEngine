export class Game{
  public running: boolean

  constructor() {
    this.running = false
  }

  public startGame = () => this.running = true

  public stopGame = () => this.running = false
}
