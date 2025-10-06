const { z } = require("zod");

const RegisterSchema = z.object({
  name: z.coerce.string(),
  phone: z.coerce.string(),
  password: z.coerce.string(),
  conformPassword: z.coerce.string(),
});
const LoginSchema = z.object({
  phone: z.coerce.string(),
  password: z.coerce.string(),
});

module.exports = { RegisterSchema, LoginSchema };
