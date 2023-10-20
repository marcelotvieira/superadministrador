import { Request, Response } from 'express'
import { AppBaseRoutes } from './AppBaseRouter'
import { RoleController } from '../controllers/role'
import { RoleService } from '../services/role'
import expressAsyncHandler from 'express-async-handler'

export class roleRoutes extends AppBaseRoutes {
  private controller = new RoleController(new RoleService())

  setup() {

    this.router.get(
      '/roles',
      expressAsyncHandler((req: Request, res: Response) => this.controller.getRoles(req, res)))
      
    this.router.post(
      '/roles',
      expressAsyncHandler((req: Request, res: Response) => this.controller.createRole(req, res)))


    this.router.delete(
      '/roles',
      expressAsyncHandler((req: Request, res: Response) => this.controller.deleteRole(req, res)))
  }
}