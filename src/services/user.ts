import { Prisma, User } from "@prisma/client";
import prisma from ".";
import bcrypt, { genSalt } from 'bcrypt';
import internal from "stream";

export class UserService {
  private _userModel = prisma.user;

  public async getUsers() {
    return await this._userModel.findMany();
  }

  public async createUser(data: Prisma.UserCreateInput ) {
    const password = await this.toHash(data.password);
    return await this._userModel.create({ data: { ...data, password }})
  }

  private async toHash(password: string) {
    return await bcrypt.hash(password, await genSalt(10))
  }
  
  public async updateUser(userId: number, data: Prisma.UserUpdateInput){
    return await this._userModel.update({
      where: { id: userId },
      data
    })
  }
}