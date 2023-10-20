import { Prisma } from '@prisma/client'
import prisma from '.'

export class RoleService {

  private _roleModel = prisma.role

  public async createRole(data: Prisma.RoleCreateInput) {
    const newRole = await this._roleModel.create({ data })
    return newRole
  }

  public async getRoles() {
    return await this._roleModel.findMany()
  }

  public async updateRole(id: number, data: Prisma.RoleUpdateInput) {
    return await this._roleModel.update({ where: { id }, data })
  }

  public async deleteRole(id: number) {
    return await this._roleModel.delete({ where: { id }})
  }

}