import EditRecipeForm from "@/components/forms/EditRecipeForm";
import { fetchRecipeById } from "@/lib/actions/recipe.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

async function EditRecipe({ params }: Props) {
  const user = await currentUser();
  if (!user) return null;

  const recipeId = params.id;
  const recipeInfo = await fetchRecipeById(recipeId);

  if (user.id !== recipeInfo.author.id) {
    console.log("Permission denied");

    return redirect("/");
  }

  return (
    <div>
      <h2>Edit Recipe</h2>

      <section>
        <EditRecipeForm />
      </section>
    </div>
  );
}

export default EditRecipe;
