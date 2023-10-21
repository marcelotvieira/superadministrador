
import express from 'express'
import { userRoutes } from '../../src/routes/user'
import { roleRoutes } from '../../src/routes/role'


export class TestApp {
  app: express.Express

  constructor() {
    this.app = express()
    this.config()
    this.setupRoutes()
  }

  private config() {
    this.app.use(express.json())
  }

  private setupRoutes() {
    this.app.use(new userRoutes().router)
    this.app.use(new roleRoutes().router)
  }
}

export const testApp = new TestApp()
