import AccountProfile from "@/components/forms/AccountProfile.tsx 18-04-53-253";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName || "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  };

  return (
    <main>
      <h1>Onboarding</h1>
      <p>
        Complete your sign up process to start sharing your favourite recipes.
      </p>

      <section>
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default page;
