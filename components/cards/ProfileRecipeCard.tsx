import { multiFormatDateString } from "@/lib/utils";
import Image from "next/image";

interface Props {
  id: string;
  title: string;
  image: string | "";
  createdAt: string;
}

function ProfileRecipeCard({ id, title, image, createdAt }: Props) {
  return (
    <article className="border border-accent-1 flex flex-col max-w-[18rem] rounded-lg overflow-hidden h-full min-h-[320px]">
      <div className="aspect=4/3 overflow-hidden w-full h-[11.9rem] object-center flex items-center">
        <Image
          src={image}
          alt="recipe"
          height={100}
          width={80}
          className="flex-1 object-fill object-center h-auto w-full"
        />
      </div>

      <div className="p-5 bg-gray-50 mt-auto flex-1 flex flex-col ">
        <h3 className="text-xl text-slate-800 font-lora">{title}</h3>

        <div className="mt-4">
          <p className="text-xs text-slate-400">
            Posted – {multiFormatDateString(createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default ProfileRecipeCard;
