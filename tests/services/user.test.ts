import prisma from '../../src/services'
import { UserService } from '../../src/services/user'

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService()
  })
  afterAll(async () => {
    await prisma.user.deleteMany({})
    await prisma.$disconnect()
  })


  it('deve criar um usuário', async () => {
    const userData = {
      username: 'testuser',
      firstName: 'test',
      lastName: 'user',
      email: 'test@contato.com',
      password: 'password123',
    }
    const createUserResponse = await userService.createUser(userData)
    expect(createUserResponse).toHaveProperty('token')
  })

  it('deve obter todos os usuários', async () => {
    userService._userModel.findMany = jest.fn().mockResolvedValue([{ id: 1, username: 'user1' }])
    const users = await userService.getUsers()
    expect(Array.isArray(users)).toBe(true)
  })

  it('deve atualizar um usuário', async () => {
    userService._userModel.update = jest.fn().mockResolvedValue({ id: 1, username: 'newUsername' })
    const userId = 1
    const updatedData = { username: 'newUsername' }
    const updatedUser = await userService.updateUser(userId, updatedData)
    expect(updatedUser.username).toEqual(updatedData.username)
  })

  it('deve excluir um usuário', async () => {
    userService._userModel.delete = jest.fn().mockResolvedValue({ id: 1 })
    const userId = 1
    const deletedUser = await userService.deleteUser(userId)
    expect(deletedUser).toBeTruthy()
  })
})
