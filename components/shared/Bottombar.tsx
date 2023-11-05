"use client";

import { bottombarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Bottombar() {
  const pathname = usePathname();

  return (
    <footer className="z-50 bg-dark-1 flex-between w-full sticky bottom-0 rounded-t-[20px] bg-dark-2 px-10 py-2 md:hidden flex justify-between overflow-hidden gap-2">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`text-white flex flex-col items-center justify-center p-2 rounded-2xl ${
              isActive && "bg-accent-1"
            }`}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              width={28}
              height={28}
              className={`invert ${isActive && "invert"}`}
            />
          </Link>
        );
      })}
      <div className="flex xs:hidden justify-center items-center">
        <SignedIn>
          <SignOutButton>
            <div className="flex flex-row gap-2">
              <Image
                src="/assets/icons/Logout.svg"
                alt="create recipe"
                height={28}
                width={28}
                className="invert"
              />
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </footer>
  );
}

export default Bottombar;
