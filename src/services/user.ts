import { Prisma, User } from "@prisma/client";
import prisma from ".";
import internal from "stream";

export class UserService {
  private _userModel = prisma.user;

  public async getUsers() {
    return await this._userModel.findMany();
  }

  public async createUser(data: Prisma.UserCreateInput ) {
    return await this._userModel.create({ data })
  }
  
  public async updateUser(userId: number, data: Prisma.UserUpdateInput){
    return await this._userModel.update({
      where: { id: userId },
      data
    })
  }
}