import { Request, Response, Router } from 'express'
import { UserController } from '../controllers/user'
import { UserService } from '../services/user'

export class userRoutes{
  public router = Router()
  private controller = new UserController(new UserService())

  constructor() {
    this.setup()
  }

  private async setup() {
    this.router.get('/users', (req: Request, res: Response) => this.controller.getUsers(req, res))
    this.router.post('/users', (req: Request, res: Response) => this.controller.createUser(req, res))
    this.router.delete('/users', (req: Request, res: Response) => this.controller.deleteUser(req, res))
  }
}