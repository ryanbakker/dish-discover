import RecipeCard from "@/components/cards/RecipeCard";
import { fetchRecipes } from "@/lib/actions/recipe.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const result = await fetchRecipes();
  const user = await currentUser();

  // Sort recipes by createdAt in descending order
  result.recipes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="flex flex-col justify-start pb-10">
      <div className="flex items-center justify-center w-full py-8">
        <h1 className="sm:text-2xl text-3xl font-lora">Recipes</h1>
      </div>

      <div className="mt-2 flex flex-wrap gap-10 justify-center max-w-[65rem]">
        {result.recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          <>
            {result.recipes.map((recipe) => (
              <Link href={`/recipe/${recipe.id}`} key={recipe._id}>
                <RecipeCard
                  id={recipe._id}
                  currentUserId={user?.id || ""}
                  title={recipe.title}
                  image={recipe.image}
                  ingredients={recipe.ingredients}
                  method={recipe.method}
                  notes={recipe.notes}
                  author={recipe.author}
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
