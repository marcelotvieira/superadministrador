import z from 'zod'

// const RoleNameEnum = z.enum(['admin', 'user'])

export const userCreateSchema = z.object({
  email: z.string().email(),
  username: z.string().min(6),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  telephone: z.string().optional(),
  password: z.string().min(8),
  roleId: z.number().optional(),
})

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(6).optional(),
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  telephone: z.string().min(10).optional(),
  password: z.string().min(8).optional(),
})