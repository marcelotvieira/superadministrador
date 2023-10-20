import { Request, Response } from 'express'
import { UserController } from '../controllers/user'
import { UserService } from '../services/user'
import { AppBaseRoutes } from './AppBaseRouter'
import expressAsyncHandler from 'express-async-handler'

export class userRoutes extends AppBaseRoutes {
  private controller = new UserController(new UserService())

  setup() {

    this.router.get(
      '/users',
      expressAsyncHandler((req: Request, res: Response) => this.controller.getUsers(req, res)))
    
    this.router.post(
      '/users',
      expressAsyncHandler((req: Request, res: Response) => this.controller.createUser(req, res)))


    this.router.delete(
      '/users/:id',
      expressAsyncHandler((req: Request, res: Response) => this.controller.deleteUser(req, res)))

  }
}