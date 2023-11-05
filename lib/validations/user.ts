import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3).max(30),
  username: z
    .string()
    .min(4, { message: "Username must have a minimum of 4 characters" })
    .max(30, { message: "Usernames have a maximum of 30 characters" }),
  bio: z
    .string()
    .min(3, { message: "Bios must have a minimum of 3 characters" })
    .max(500, { message: "Bios have a maximum of 500 characters" }),
});
