import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen overflow-hidden bg-slate-900">
      <div className="flex flex-col items-center gap-8">
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
        <SignIn />
      </div>

      <div>{/* Showcase Image */}</div>
    </main>
  );
}
