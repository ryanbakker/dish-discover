"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex bg-dark-1 min-h-[90vh] max-w-[15rem]">
      <nav className="flex flex-1 flex-col gap-12 pb-20 px-4 justify-center mt-0">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`flex items-center gap-3 py-3 px-5 rounded-md text-white ${
                isActive && "bg-accent-1"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={26}
                width={26}
                className="invert"
              />

              <p className="font-medium">{link.label}</p>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default LeftSidebar;