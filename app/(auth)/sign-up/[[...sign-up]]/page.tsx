import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

function page() {
  return (
    <main className="flex items-center justify-center min-h-screen overflow-hidden bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Image
            src="/assets/icons/ChefHat.svg"
            alt="logo"
            height={32}
            width={32}
            className="invert"
          />
          <p className="text-3xl text-white font-medium tracking-tight">
            DishDiscover
          </p>
        </div>
        <SignUp />
      </div>

      <div>{/* Showcase Image */}</div>
    </main>
  );
}

export default page;
