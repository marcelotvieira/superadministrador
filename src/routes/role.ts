import { Request, Response } from 'express'
import { AppBaseRoutes } from './AppBaseRouter'
import { RoleController } from '../controllers/role'
import { RoleService } from '../services/role'

export class roleRoutes extends AppBaseRoutes {
  private controller = new RoleController(new RoleService())

  setup() {

    this.router.get(
      '/roles',
      (req: Request, res: Response) => this.controller.getRoles(req, res))


    this.router.post(
      '/roles',
      (req: Request, res: Response) => this.controller.createRole(req, res))


    this.router.delete(
      '/roles',
      (req: Request, res: Response) => this.controller.deleteRole(req, res))

  }
}