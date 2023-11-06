import ProfileRecipeCard from "@/components/cards/ProfileRecipeCard";
import Loader from "@/components/shared/Loader";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUserRecipes } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

async function page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const userId = params.id;
  const userInfo = await fetchUser(userId);
  const userRecipes = await fetchUserRecipes(userId);

  console.log(userRecipes);

  return (
    <section className="w-full">
      <ProfileHeader
        accountId={userInfo.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="p-8 flex flex-wrap gap-10 justify-center max-w-[65rem] mx-auto">
        {userRecipes.map((recipe) => (
          <Link href={`/recipe/${recipe._id}`} key={recipe.id}>
            <ProfileRecipeCard
              id={recipe._id}
              title={recipe.title}
              image={recipe.image}
              createdAt={recipe.createdAt.toISOString()}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default page;
