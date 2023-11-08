import PostRecipe from "@/components/forms/PostRecipe";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  return (
    <>
      <h1 className="page-heading">Create Recipe</h1>

      <div className="flex flex-1 w-full max-w-3xl pb-20 px-6 sm:px-14 md:px-8 lg:px-16">
        <PostRecipe userId={userInfo._id} image={""} />
      </div>
    </>
  );
}

export default page;
