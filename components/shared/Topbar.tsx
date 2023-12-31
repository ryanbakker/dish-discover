"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dark } from "@clerk/themes";

function Topbar() {
  const pathname = usePathname();

  return (
    <header className="bg-dark-1 pl-5 pr-4 py-2">
      <nav className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/ChefHat.svg"
            alt="logo"
            height={26}
            width={26}
            className="invert"
          />
          <p className="text-2xl text-white font-medium tracking-tight font-lora">
            DishDiscover
          </p>
        </Link>

        <div className="ml-auto">
          <ul className="flex items-center flex-row gap-8">
            <li className="hidden md:block">
              <Link
                href="/create-recipe"
                className={`flex flex-row gap-2 py-2 px-4 rounded-lg ${
                  pathname === "/create-recipe" && "bg-accent-1"
                }`}
              >
                <Image
                  src="/assets/icons/TextPlus.svg"
                  alt="create recipe"
                  height={22}
                  width={22}
                  className="invert"
                />
                <p className="text-white font-medium">Create</p>
              </Link>
            </li>
            <li className="hidden xs:block">
              <SignedIn>
                <SignOutButton>
                  <div className="flex flex-row gap-2">
                    <Image
                      src="/assets/icons/Logout.svg"
                      alt="create recipe"
                      height={22}
                      width={22}
                      className="invert"
                    />
                    <p className="cursor-pointer text-white font-medium">
                      Sign Out
                    </p>
                  </div>
                </SignOutButton>
              </SignedIn>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Topbar;
