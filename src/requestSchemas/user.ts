import z from 'zod'

export const userCreateSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  telephone: z.string().optional(),
  password: z.string()
})

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  telephone: z.string().optional(),
  password: z.string().optional(),
})