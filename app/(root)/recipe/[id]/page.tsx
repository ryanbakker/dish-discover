import BackButton from "@/components/shared/BackButton";
import DeleteButton from "@/components/shared/DeleteButton";
import SuggestedRecipes from "@/components/shared/SuggestedRecipes";
import { Button } from "@/components/ui/button";
import { fetchRecipeById } from "@/lib/actions/recipe.actions";
import { multiFormatDateString } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;
  const recipe = await fetchRecipeById(params.id);

  const user = await currentUser();
  if (!user) return null;

  const isAuthor = user.id === recipe.author.id;

  return (
    <article className="pb-12">
      <div className="aspect=4/3 overflow-hidden w-full h-[25rem] flex items-center shadow-xl">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={300}
          height={90}
          className="object-fill flex-1 object-center h-auto w-full"
        />
      </div>

      <div className="px-6 py-8 sm:px-14 md:px-8 lg:px-32 2xl:px-48 max-w-[80rem]">
        <BackButton />

        <h2 className="font-lora text-slate-800 text-3xl lg:text-4xl font-medium">
          {recipe.title}
        </h2>

        <div className="mt-7 pb-4 flex flex-row">
          <Link
            href={`/profile/${recipe.author._id}`}
            className="flex gap-2 items-center"
          >
            <Image
              src={recipe.author.image}
              alt={recipe.author.name}
              height={50}
              width={50}
              className="rounded-full h-10 w-10 object-fill object-center"
            />

            <div className="flex flex-col gap-0">
              <h3 className="m-0 p-0 text-slate-600">{recipe.author.name}</h3>
              <p className="text-xs text-slate-400">
                Published – {multiFormatDateString(recipe.createdAt)}
              </p>
            </div>
          </Link>

          <div className="ml-auto flex flex-row gap-2">
            <div className="flex gap-2">
              <Button
                className="bg-slate-800 cursor-pointer hover:bg-slate-600"
                title="share"
                type="button"
              >
                <Image
                  src="/assets/icons/share.svg"
                  alt="edit recipe"
                  height={20}
                  width={20}
                  className="invert"
                />
              </Button>
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

              {isAuthor && (
                <>
                  <DeleteButton recipeId={recipe._id.someProperty} />
                </>
              )}
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
          <p className="font-light">{recipe.method}</p>
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
          <p className="font-light">{recipe.notes}</p>
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

export default Page;
