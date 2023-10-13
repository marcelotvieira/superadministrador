import z from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string()
})