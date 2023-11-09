import ProfileRecipeCard from "@/components/cards/ProfileRecipeCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import {
  fetchUserByParams,
  fetchUserRecipes,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

async function page({ params }: { params: { id: string } }) {
  const userId = params.id;
  const userInfo = await fetchUserByParams(params.id);
  const userRecipes = await fetchUserRecipes(userId);
  const user = await currentUser();
  // const currentUserId

  console.log("USEERR = ", user!.id);

  console.log("userId: ", userId);
  console.log("userInfo: ", userInfo);
  console.log("userRecipes: ", userRecipes);

  return (
    <section className="w-full">
      <ProfileHeader
        accountId={userInfo.id}
        _id={userInfo._id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        currentUser={user!.id}
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
