import RecipeSingle from "@/components/shared/RecipeSingle";
import { fetchRecipeById } from "@/lib/actions/recipe.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const recipe = await fetchRecipeById(params.id);

  return (
    <section>
      <div>
        <RecipeSingle
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
      </div>
    </section>
  );
};

export default Page;
