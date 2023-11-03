import * as z from "zod";

export const RecipeValidation = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(50, { message: "Title has a max of 50 characters" }),
  image: z.string().url().nonempty(),
  ingredients: z
    .string()
    .min(5, { message: "Ingredients must be at least 5 characters" })
    .max(200, { message: "Ingredients has a max of 200 characters" }),
  method: z
    .string()
    .min(5, { message: "Method must be at least 5 characters" })
    .max(2500, { message: "Method has a max of 2500 characters" }),
  notes: z
    .string()
    .min(5, { message: "Notes must be at least 5 characters" })
    .max(200, { message: "Notes has a max of 200 characters" }),
});
