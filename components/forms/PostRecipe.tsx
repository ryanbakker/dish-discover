"use client";

import { useOrganization } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeValidation } from "@/lib/validations/recipe";
import { createRecipe } from "@/lib/actions/recipe.actions";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "../ui/use-toast";

interface Props {
  userId: string;
  image: string;
}

function PostRecipe({ userId, image }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(
    image || null
  );

  const form = useForm({
    resolver: zodResolver(RecipeValidation),
    defaultValues: {
      title: "",
      image: "",
      ingredients: "",
      method: "",
      notes: "",
      accountId: userId,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles([file]);

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        // Set the URL instead of the file object
        fieldChange(imageDataUrl);
        setImagePreview(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof RecipeValidation>) => {
    try {
      await createRecipe({
        title: values.title,
        image: values.image,
        ingredients: values.ingredients,
        method: values.method,
        notes: values.notes,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });

      toast({
        title: "Success! Your recipe was created",
      });

      router.push("/");
    } catch (error: any) {
      toast({
        title: "Error! Your recipe was unsuccessfully posted",
        variant: "destructive",
      });

      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Succulent Roast Chicken & Potatoes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="profile photo"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/icons/PhotoUpload.svg"
                      alt="profile photo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a pic"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients (seperated by comma " , "):</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="1 Cup Flour , 1/2 Cup Butter"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method:</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e)}
                    placeholder="1) Heat oil in pan on high heat..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes:</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e)}
                    placeholder="When mashing banana remember to..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="button" onClick={() => router.push("/")}>
              Cancel
            </Button>
            <Button type="submit">Post Recipe</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default PostRecipe;
