"use client";

import { deleteRecipe } from "@/lib/actions/recipe.actions";
import { Button } from "../ui/button";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

function DeleteButton({ recipeId }: { recipeId: string }) {
  const router = useRouter();

  console.log("DeleteButton - recipeId: ", recipeId);

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
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            className="bg-red-800 hover:bg-red-600 cursor-pointer"
            title="delete"
          >
            <Image
              src="/assets/icons/delete.svg"
              alt="delete recipe"
              height={20}
              width={20}
              className="invert"
            />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanetly delete your
              recipe!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-700">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteButton;
