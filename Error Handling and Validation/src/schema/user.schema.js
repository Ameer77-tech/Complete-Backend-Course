import { z } from "zod";

const userSchema = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty().lowercase(),
  password: z
    .string()
    .nonempty()
    .min(6, { error: "Must be Between 6 and 10 characters long" })
    .max(10, { error: "Must be Between 6 and 10 characters long" }),
});

export default userSchema;
