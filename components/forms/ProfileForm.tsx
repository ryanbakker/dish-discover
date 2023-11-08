"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useUploadThing } from "@/lib/uploadthing";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import Image from "next/image";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
}

function ProfileForm({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  const handleCancel = () => {
    router.back();
  };

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }

    await updateUser({
      name: values.name,
      path: pathname,
      username: values.username,
      userId: user.id,
      bio: values.bio,
      image: values.profile_photo,
    });

    if (pathname === `/profile/${user.objectId}}/edit`) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 ">
                <FormLabel
                  className="account-form_image-label hover:cursor-pointer"
                  title="Select Image"
                >
                  <div className="border border-accent-1 rounded-full p-1">
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="profile_icon"
                        width={160}
                        height={160}
                        priority
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <Image
                        src="/assets/profile.svg"
                        alt="profile_icon"
                        width={160}
                        height={160}
                        className="object-contain"
                      />
                    )}
                  </div>
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-0">
                  <FormLabel className="text-slate-800 font-light">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="font-light focus-visible:ring-0 focus-visible:border-accent-1 bg-gray-100 placeholder:text-gray-500 border-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-0">
                  <FormLabel className="text-slate-800 font-light">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="font-light focus-visible:ring-0 focus-visible:border-accent-1 bg-gray-100 placeholder:text-gray-400 border-transparent"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-0">
              <FormLabel className="text-slate-800 font-light">Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="font-light focus-visible:ring-0 focus-visible:border-accent-1 bg-gray-100 placeholder:text-gray-500 border-transparent resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4 justify-end">
          <Button
            onClick={handleCancel}
            className="text-sm font-normal px-6 bg-slate-500 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-accent-1 px-8 text-sm text-white font-medium hover:bg-slate-700"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProfileForm;
