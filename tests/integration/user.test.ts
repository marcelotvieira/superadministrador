import supertest from 'supertest'
import { Prisma, User } from '@prisma/client'
import { userRoutes } from '../../src/routes/user'
import prisma from '../../src/services'
import { App } from '../../src/app'


const app = new App().app
const userRoutesInstance = new userRoutes()

userRoutesInstance.setup()

const clearDatabase = async () => {
  await prisma.user.deleteMany({})
}

afterEach(clearDatabase)
beforeAll(clearDatabase)

afterAll(async () => {
  await prisma.$disconnect()
})

const userTestData = {
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doee',
  email: 'john@example.com',
  password: 'password123',
}

const wrongUserTestData = {
  username: 'johndoe',
  firstName: 'a',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password123',
}

test('Deve criar um usuário via rota POST /users', async () => {
  const userData: Prisma.UserCreateInput = userTestData
  const response = await supertest(app)
    .post('/users')
    .send(userData)
    .expect(201)
  expect(response.body).toHaveProperty('token')
})

test('Deve retornar um BAD_REQUEST ERROR ao enviar um usuário inválido para a rota post /users', async () => {
  const userData = wrongUserTestData
  const response = await supertest(app)
    .post('/users')
    .send(userData)
    .expect(400)
  expect(response.body).toHaveProperty('error')
  expect(response.body.error).toBe('ZodError')
})

test('Deve obter todos os usuários via rota GET /users', async () => {
  await prisma.user.create({ data: userTestData })
  const response = await supertest(app)
    .get('/users')
    .expect(200)
  expect(Array.isArray(response.body.users)).toBe(true)
})

// needs to be tested the authentication fail response

test('Deve excluir um usuário via rota DELETE /users/:id', async () => {
  const createdUser: User = await prisma.user
    .create({ data: userTestData })

  const userId: number = createdUser.id
  const response = await supertest(app)
    .delete(`/users/${userId}`)
    .expect(200)
  expect(response.body.deleted).toBeTruthy()
})
