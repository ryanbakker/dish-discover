import { multiFormatDateString } from "@/lib/utils";
import Image from "next/image";
import SuggestedRecipes from "./SuggestedRecipes";
import Link from "next/link";
import { Button } from "../ui/button";
import BackButton from "./BackButton";

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

const RecipeSingle = ({
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
    <article className="pb-12">
      <div className="apsect=4/3 overflow-hidden w-full h-[25rem] flex items-center shadow-xl">
        <Image
          src={image}
          alt={title}
          width={300}
          height={90}
          className="object-fill flex-1 object-center h-auto w-full"
        />
      </div>

      <div className="px-6 py-8 sm:px-14 md:px-8 lg:px-32 2xl:px-48 max-w-[80rem]">
        <BackButton />

        <h2 className="font-lora text-slate-800 text-3xl lg:text-4xl font-medium">
          {title}
        </h2>

        <div className="mt-7 pb-4 flex flex-row">
          <Link href={`/profile/${id}`} className="flex gap-2 items-center">
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
          </Link>

          <div className="ml-auto flex flex-row gap-2">
            {/* Visible if author */}
            <Button
              className="bg-slate-800 cursor-pointer hover:bg-slate-600"
              title="share"
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
              <Button
                className="bg-slate-800 cursor-pointer hover:bg-slate-600"
                title="edit"
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit recipe"
                  height={20}
                  width={20}
                  className="invert"
                />
              </Button>
              <Button
                className="bg-red-800 hover:bg-red-600 cursor-pointer"
                title="delete"
              >
                <Image
                  src="/assets/icons/delete.svg"
                  alt="delete recipe"
                  height={20}
                  width={20}
                  className="invert"
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full relative mb-8 mt-10">
          <h3 className="relative z-10 bg-white px-4">
            <span className="relative font-lora font-light text-xl">
              Ingredients
            </span>
          </h3>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-400"></div>
          </div>
        </div>

        {/* <div>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
        </div> */}

        <div className="flex justify-center w-full relative mb-8 mt-10">
          <h3 className="relative z-10 bg-white px-4">
            <span className="relative font-lora font-light text-xl">
              Method
            </span>
          </h3>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-400"></div>
          </div>
        </div>

        <div>
          <p className="font-light">{method}</p>
        </div>

        <div className="flex justify-center w-full relative mb-8 mt-10">
          <h3 className="relative z-10 bg-white px-4">
            <span className="relative font-lora font-light text-xl">Notes</span>
          </h3>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-400"></div>
          </div>
        </div>

        <div>
          <p className="font-light">{notes}</p>
        </div>

        <div className="flex justify-center w-full relative mb-8 mt-10">
          <h3 className="relative z-10 bg-white px-4">
            <span className="relative font-lora font-light text-xl">
              Suggested Recipes
            </span>
          </h3>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-400"></div>
          </div>
        </div>

        <SuggestedRecipes />
      </div>
    </article>
  );
};

export default RecipeSingle;
