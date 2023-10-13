import { Prisma, User } from "@prisma/client";
import prisma from ".";

export class UserService {
  private _userModel = prisma.user;

  public async getUsers() {
    return await this._userModel.findMany();
  }

  public async createUser(data: Prisma.UserCreateInput ) {
    return await this._userModel.create({ data })
  }
  


}