import { z } from 'zod';

const userRegisterValidationSchema = z.object({
  name: z.string().max(20).min(3),
  email: z.string().email(),
  password: z.string(),
});

export const UserValidation = {
  userRegisterValidationSchema,
};
