import UserCard from "@/components/cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.actions";

async function page() {
  const allUsers = await fetchUsers();

  console.log("All Users: ", allUsers.users);

  return (
    <section className="flex flex-col justify-center items-center py-10 px-6 w-full">
      <h1 className="sm:text-2xl text-3xl font-lora w-full flex justify-center">
        Find Authors
      </h1>

      <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allUsers.users.length > 0 ? (
          <>
            {allUsers.users.map((author) => (
              <UserCard
                key={author.id}
                _id={author._id}
                id={author.id}
                name={author.name}
                username={author.username}
                imgUrl={author.image}
              />
            ))}
          </>
        ) : (
          <p>No authors yet</p>
        )}
      </div>
    </section>
  );
}

export default page;
