import express from 'express'
import { userRoutes } from './routes/routes'


export class App {
  app: express.Express

  constructor() {
    this.app = express()
    this.config()
    this.setupRoutes()
    this.errorConfig()
  }

  private async config() {
    this.app.use(express.json())
  }

  private async setupRoutes() {
    this.app.use(new userRoutes().router)
  }

  private async errorConfig() {

  }
  
  public async start() {
    this.app.listen(
      process.env.PORT ? Number(process.env.PORT) : 3333,
      () => console.log('HTTP Server Running')
    )
  }
}
