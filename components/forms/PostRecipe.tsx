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
import { toast, useToast } from "../ui/use-toast";

interface Props {
  userId: string;
  image: string;
}

function PostRecipe({ userId, image }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const { toast } = useToast();
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col"
        >
          <div className="flex">
            <div className="flex flex-1 flex-col gap-5 justify-center mb-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="form-label">Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        autoComplete="off"
                        placeholder="Succulent Roast Chicken & Potatoes"
                        className="font-light focus-visible:ring-0 focus-visible:border-accent-1 bg-gray-100 placeholder:text-gray-600 border-transparent"
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
                    <FormLabel className="form-label">Ingredients</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value || ""}
                        autoComplete="off"
                        onChange={(e) => field.onChange(e)}
                        placeholder="1 Cup Flour , 1/2 Cup Butter"
                        className="form-textarea min-h-[8rem]"
                      />
                    </FormControl>
                    <FormMessage className="text-gray-400 font-light">
                      seperated by comma " , "
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="items-center gap-4 py-8 pl-8 flex flex-col ml-auto">
                  <FormLabel className="overflow-hidden h-14rem w-14rem aspect-square flex justify-center items-center rounded-xl">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="profile photo"
                        width={280}
                        height={280}
                        priority
                      />
                    ) : (
                      <div className="bg-gray-100 p-20 flex flex-col items-center justify-center rounded-xl">
                        <Image
                          src="/assets/icons/PhotoUpload.svg"
                          alt="profile photo"
                          width={95}
                          height={95}
                          className="opacity-50"
                        />
                        <p className="pt-4 opacity-50">Click to Select Image</p>
                      </div>
                    )}
                  </FormLabel>
                  <span
                    className={`font-light text-gray-500 !mt-0 ${
                      imagePreview && "text-gray-200"
                    }`}
                  >
                    {imagePreview ? "Click image to replace" : ""}
                  </span>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input
                      type="file"
                      accept="image/*"
                      className="max-w-[14rem] hidden"
                      onChange={(e) => handleImage(e, field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Method:</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      autoComplete="off"
                      onChange={(e) => field.onChange(e)}
                      placeholder="1) Heat oil in pan on high heat..."
                      className="form-textarea min-h-[12rem]"
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
                  <FormLabel className="form-label">Notes:</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value || ""}
                      autoComplete="off"
                      onChange={(e) => field.onChange(e)}
                      placeholder="When mashing banana remember to..."
                      className="form-textarea resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-10 flex gap-4">
            <Button
              type="button"
              onClick={() => router.push("/")}
              className="bg-slate-400"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-accent-1">
              Post Recipe
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default PostRecipe;
