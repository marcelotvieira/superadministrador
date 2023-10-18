import { Prisma, User } from '@prisma/client'
import prisma from '.'
import bcrypt, { genSalt } from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

export class UserService {
  private _userModel = prisma.user

  public async getUsers() {
    return await this._userModel.findMany()
  }

  public async createUser(data: Prisma.UserCreateInput ): Promise<{ token: string }> {
    const password = await this.toHash(data.password)
    const newUser = await this._userModel.create({ data: { ...data, password }})
    return { token: this.toJwt({
      id: newUser.id,
      username: newUser.username,
    }) }
  }

  private async toHash(password: string): Promise<string> {
    return await bcrypt.hash(password, await genSalt(10))
  }

  private toJwt(payload: JwtPayload): string {
    return jwt.sign(payload, process.env.SECRET || 'devsecretfortoken')
  }
  
  public async updateUser(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this._userModel.update({ where: { id }, data })
  }

  public async deleteUser(id: number): Promise<User> {
    return await this._userModel.delete({ where: { id }})
  }
}