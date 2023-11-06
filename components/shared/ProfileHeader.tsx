"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import ProfileButtons from "./ProfileButtons";

interface Props {
  accountId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

function ProfileHeader({ accountId, name, username, imgUrl, bio }: Props) {
  const router = useRouter();

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
          <ProfileButtons />
        </div>
        <p className="mt-2 font-light text-slate-800 max-w-xl">{bio}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;

// Name
// Username
// Profile Photo
// Bio
// Edit Profile
// Delete Profile
// Share Profile
