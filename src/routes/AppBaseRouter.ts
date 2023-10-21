import { Router } from 'express'

export abstract class AppBaseRoutes {
  public router = Router()
  
  constructor() {

    this.setup()
  }

  protected abstract setup(): void
}
