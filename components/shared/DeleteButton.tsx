"use client";

import { deleteRecipe } from "@/lib/actions/recipe.actions";
import { Button } from "../ui/button";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

function DeleteButton({ recipeId }: { recipeId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipeId);

      toast({
        title: "Deleting Recipe...",
      });
    } catch (error: any) {
      console.error("Failed to delete recipe: ", error.message);
    } finally {
      toast({
        title: "Success! Please wait while we redirect you...",
      });

      router.back();
    }
  };

  return (
    <Button
      className="bg-red-800 hover:bg-red-600 cursor-pointer"
      title="delete"
      onClick={handleDelete}
    >
      <Image
        src="/assets/icons/delete.svg"
        alt="delete recipe"
        height={20}
        width={20}
        className="invert"
      />
    </Button>
  );
}

export default DeleteButton;
