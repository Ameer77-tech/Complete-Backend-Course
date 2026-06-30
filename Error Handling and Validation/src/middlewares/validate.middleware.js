import { z } from "zod";

const userSchema = z.object({
    
})

const createBookSchema = z.object({
  title: z.string().nonempty(),
  author: z.string().nonempty(),
  genre: z.string().nonempty(),
  totalCopies: z.number().nonempty(),
  available: z.number().nonempty(),
  description: z.string().nonempty(),
  publishedAt: z.date().nonempty(),
  isbn: z.string().nonempty(),
});
