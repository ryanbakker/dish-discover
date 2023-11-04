import { multiFormatDateString } from "@/lib/utils";
import Image from "next/image";

interface Props {
  id: string;
  currentUserId: string;
  title: string;
  ingredients: string;
  image: string | "";
  method: string;
  notes: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
}

const RecipeCard = ({
  id,
  currentUserId,
  title,
  ingredients,
  image,
  method,
  notes,
  createdAt,
  community,
  author,
}: Props) => {
  return (
    <article className="border border-accent-1 flex flex-col max-w-xs rounded-lg overflow-hidden h-full min-h-[346px]">
      <div className="aspect=4/3 overflow-hidden w-full h-48 object-center flex items-center">
        <Image
          src={image}
          alt="Recipe"
          width={200}
          height={100}
          className="flex-1 object-fill object-center h-auto w-full"
        />
      </div>

      <div className="p-5 bg-gray-50 mt-auto flex-1 flex flex-col justify-between">
        <h3 className="text-xl text-slate-800 font-lora">{title}</h3>

        <div className="flex gap-2 mt-4 items-center">
          <Image
            src={author.image}
            alt={author.name}
            height={50}
            width={50}
            className="rounded-full h-10 w-10 object-fill object-center"
          />

          <div className="flex flex-col gap-0">
            <h3 className="m-0 p-0 text-slate-600">{author.name}</h3>
            <p className="text-xs text-slate-400">
              Published – {multiFormatDateString(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
