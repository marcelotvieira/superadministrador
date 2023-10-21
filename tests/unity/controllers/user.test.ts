import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { UserController } from '../../../src/controllers/user'
import { UserService } from '../../../src/services/user'
import { ApiError } from '../../../src/error/ApiError'


describe('UserController', () => {
  let userService: UserService
  let userController: UserController
  let req: Request
  let res: Response

  beforeEach(() => {
    userService = new UserService()
    userController = new UserController(userService)
    req = {} as Request
    res = {} as Response
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn()
  })

  it('deve retornar a lista de usuários', async () => {
    const users = [{ id: 1, username: 'user1' }]
    userService.getUsers = jest.fn().mockResolvedValue(users)

    await userController.getUsers(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith({ users })
  })

  it('deve criar um usuário', async () => {
    const userData = {
      username: 'testuser',
      firstName: 'test',
      lastName: 'user',
      email: 'test@contato.com',
      password: 'password123',
    }

    const token = 'your-generated-token'
    userService.createUser = jest.fn().mockResolvedValue({ token })

    req.body = userData
    await userController.createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED)
    expect(res.json).toHaveBeenCalledWith({ token })
  })

  it('deve excluir um usuário com sucesso', async () => {
    const userId = '1'
    userService.deleteUser = jest.fn().mockResolvedValue({ id: userId })

    req.params = { id: userId }
    await userController.deleteUser(req, res)

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(res.json).toHaveBeenCalledWith({ deleted: { id: userId } })
  })

  it('deve retornar um erro de solicitação inválida ao fornecer um ID inválido', async () => {
    const invalidId = 'invalidId'
    req.params = { id: invalidId }
    const errorMessage = 'Id property type needs to be Integer'

    ApiError.badRequest = jest.fn().mockImplementation(() => {
      throw new ApiError(errorMessage, StatusCodes.BAD_REQUEST)
    })
    try {
      await userController.deleteUser(req, res)
      throw new Error('An error should be thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError)
      const apiError = error as ApiError
      expect(apiError.message).toBe(errorMessage)
    }
  })
})
