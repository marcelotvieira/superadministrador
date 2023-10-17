import { Request, Response } from 'express'
import { UserService } from '../services/user'
import { userCreateSchema } from '../requestSchemas/user'

export class UserController {
  private _service: UserService

  constructor(service: UserService) {
    this._service = service
  }

  public async getUsers(req: Request, res: Response) {
    const users = await this._service.getUsers()
    res.status(200).json({ users })
  }

  public async createUser(req: Request, res: Response) {
    const token = await this._service.createUser(userCreateSchema.parse(req.body))
    res.status(201).json( token )
  }

  public async deleteUser(req: Request, res: Response){
    return await this._service.deleteUser(Number(req.params.id))
  }
}