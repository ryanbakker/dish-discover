import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  _id: string;
  id: string;
  name: string;
  username: string;
  imgUrl?: string;
}

function UserCard({ _id, id, name, username, imgUrl }: UserCardProps) {
  console.log("_id: ", _id);

  return (
    <Link
      href={`/profile/${_id}`}
      className="bg-accent-light p-6 rounded-xl flex flex-col justify-center items-center w-full gap-4 hover:bg-accent-hover transition-all"
    >
      <div className="p-1 border border-accent-1 rounded-full">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt="author"
            height={70}
            width={70}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/assets/icons/userPlaceholder.svg"
            alt="author placeholder"
            height={70}
            width={70}
            className="rounded-full"
          />
        )}
      </div>

      <div className="flex flex-col items-center justify-center">
        <h3 className="text-slate-800 text-lg font-medium">{name}</h3>
        <p className="text-slate-500 text-sm font-light">@{username}</p>

        <Link
          href={`/profile/${_id}`}
          className="px-5 py-2 bg-slate-700 text-white text-xs font-regular rounded-lg mt-5"
        >
          View Profile
        </Link>
      </div>
    </Link>
  );
}

export default UserCard;
