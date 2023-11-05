"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={router.back}
      className="bg-transparent text-slate-800 opacity-50 flex gap-1 mb-4 hover:opacity-100 hover:bg-transparent transition-all p-0"
    >
      <Image src="/assets/icons/back.svg" alt="back" height={16} width={16} />
      Recipes
    </Button>
  );
}

export default BackButton;
