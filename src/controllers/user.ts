import { Request, Response } from 'express'
import { UserService } from '../services/user'
import { userCreateSchema } from '../requestSchemas/user'
import { StatusCodes } from 'http-status-codes'

export class UserController {
  private _service: UserService

  constructor(service: UserService) {
    this._service = service
  }

  public async getUsers(req: Request, res: Response) {
    const users = await this._service.getUsers()
    res.status(StatusCodes.OK).json({ users })
  }

  public async createUser(req: Request, res: Response) {
    const token = await this._service.createUser(userCreateSchema.parse(req.body))
    res.status(StatusCodes.CREATED).json( token )
  }

  public async deleteUser(req: Request, res: Response){
    const deleted = await this._service.deleteUser(Number(req.params.id))
    res.status(StatusCodes.OK).json({ deleted })
  }
}