"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";

interface Props {
  accountId: string;
  _id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

function ProfileHeader({ accountId, _id, name, username, imgUrl, bio }: Props) {
  const { toast } = useToast();
  const pathname = usePathname();

  const handleShareClick = () => {
    // Generate the recipe URL from current page
    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;

    // Copy the URL to clipboard
    navigator.clipboard.writeText(profileUrl);

    toast({
      title: "Profile link copied to clipboard!",
    });
  };

  return (
    <div className="shadow-lg w-full p-10 flex gap-4">
      <div>
        <div className="p-1 border-[1.5px] border-accent-1 rounded-full m-auto bg-white z-50 relative">
          <Image
            src={imgUrl}
            alt="user"
            height={80}
            width={80}
            className="rounded-full"
          />
        </div>

        <div className="bg-accent-1 h-full w-[1.5px] ml-[2.52rem] -mt-[4.53rem] rounded-full" />
      </div>

      <div className="w-full relative">
        <div className="flex items-center">
          <div>
            <h2 className="text-3xl font-lora text-slate-800">{name}</h2>
            <h5 className="text-slate-500">@{username}</h5>
          </div>
          <div className="ml-auto flex gap-2">
            <Button
              className="bg-slate-800 cursor-pointer hover:bg-slate-600"
              title="share"
              onClick={handleShareClick}
            >
              <Image
                src="/assets/icons/share.svg"
                alt="edit recipe"
                height={20}
                width={20}
                className="invert"
              />
            </Button>
            <div className="flex gap-2">
              <Link
                href={`/profile/${_id}/edit`}
                className="bg-slate-800 cursor-pointer hover:bg-slate-600 flex justify-center items-center rounded-md px-4"
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit recipe"
                  height={20}
                  width={20}
                  className="invert"
                />
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-2 font-light text-slate-800 max-w-xl">{bio}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
