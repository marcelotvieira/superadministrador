import { Request, Response } from 'express'
import { RoleService } from '../services/role'
import { StatusCodes } from 'http-status-codes'

export class RoleController {
  private _service: RoleService

  constructor(service: RoleService) {
    this._service = service
  }

  public async getRoles(_req: Request, res: Response) {
    const roles = await this._service.getRoles()
    res.status(StatusCodes.OK).json({ roles })
  }

  public async createRole(req: Request, res: Response) {
    const newRole = await this._service.createRole(req.body)
    res.status(StatusCodes.CREATED).json({ newRole })
  }

  public async updateRole(req: Request, res: Response) {
    const newRole = await this._service.updateRole(
      Number(req.params.id),
      req.body
    )
    res.status(StatusCodes.OK).json({ newRole })
  }

  public async deleteRole(req: Request, res: Response) {
    const deleted = await this._service.deleteRole(Number(req.params.id))
    res.status(StatusCodes.OK).json({ deleted })
  }
}