import { z } from "zod";

export const ValidationRegister = z.object({
  name: z.string().min(1, { message: "O campo nome é obrigatorio" }),
  email: z.string().email({ message: "O email é obrigatório" }),
  password: z
        .string()
        .min(8, "E necessario pelo menos 8 digitos")
        .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
        .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
        .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número.")
        .regex(/(?=.*?[#?!@$%^*&-])/, "É necessário pelo menos um número."),
});