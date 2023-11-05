import RecipeCard from "@/components/cards/RecipeCard";
import { fetchRecipes } from "@/lib/actions/recipe.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const result = await fetchRecipes();
  const user = await currentUser();

  return (
    <section className="flex flex-col justify-start">
      <div className="flex items-center justify-center w-full py-8">
        <h1 className="text-2xl md:text-3xl font-lora">Recipes</h1>
      </div>

      <div className="mt-2 flex flex-wrap gap-10 justify-center max-w-[65rem]">
        {result.recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          <>
            {result.recipes.map((recipe) => (
              <Link href={`/recipe/${recipe._id}`}>
                <RecipeCard
                  key={recipe._id}
                  id={recipe._id}
                  currentUserId={user?.id || ""}
                  title={recipe.title}
                  image={recipe.image}
                  ingredients={recipe.ingredients}
                  method={recipe.method}
                  notes={recipe.notes}
                  author={recipe.author}
                  community={recipe.community}
                  createdAt={recipe.createdAt}
                />
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
