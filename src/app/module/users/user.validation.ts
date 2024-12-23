import { z } from "zod";



export const createUserValidationSchema = z.object({
  body: z.object({
    name:  z.string({ required_error: 'Name is Required' }).trim(),
    email:  z.string().email({ message: 'Email must be valid' }),
    password: z
    .string({ invalid_type_error: 'Password must be string' })
    .max(20, { message: "Password Can't be more then 20 characters" }),
    role: z.enum(["admin", "user"],{ message: 'Role must be admin or user' }).optional(),
    isBlocked: z.boolean().optional(),
  }),
});
export const userVAlidationSchema = {
  createUserValidationSchema,
};
