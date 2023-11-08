import { fetchUser } from "@/lib/actions/user.actions";
import ProfileForm from "@/components/forms/ProfileForm";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

async function EditProfile({ params }: Props) {
  const user = await currentUser();
  if (!user) return null;

  // Pass in the id and not params.id
  const userId = params.id;
  const userInfo = await fetchUser(userId);

  console.log(user.id, " === ", userInfo.id);

  if (user.id !== userInfo.id) {
    console.log("You are not the same user");

    return redirect("/");
  }

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo.image : user.imageUrl,
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-2xl font-lora my-6">Edit Profile</h2>

      <section className="w-full max-w-[25rem]">
        <ProfileForm user={userData} />
      </section>
    </div>
  );
}

export default EditProfile;
