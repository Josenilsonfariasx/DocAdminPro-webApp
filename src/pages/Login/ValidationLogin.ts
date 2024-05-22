import { z } from "zod";

export const ValidationLogin = z.object({
  email: z.string().min(1, { message: "O campo email é obrigatorio" }),
  password: z.string().min(1, { message: "O campo password é obrigatorio" }),
});