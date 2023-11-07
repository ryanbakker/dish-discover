"use server";

import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Recipe from "../models/recipe.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchRecipes() {
  try {
    connectToDB();

    const recipes = await Recipe.find().populate("author");
    return { recipes };
  } catch (error: any) {
    throw new Error(`Failed to fetch recipes: ${error.message}`);
  }
}

interface Params {
  title: string;
  author: string;
  image: string;
  ingredients: string;
  method: string;
  notes: string;
  communityId: string | null;
  path: string;
}

export async function createRecipe({
  title,
  image,
  ingredients,
  method,
  notes,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const communityIdObject = communityId
      ? await Community.findOne({ id: communityId }, { _id: 1 })
      : null;

    const createdRecipe = await Recipe.create({
      title,
      author,
      image,
      ingredients,
      method,
      notes,
      community: communityIdObject, // Assign Id if provided, or leave null
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { recipes: createdRecipe._id },
    });

    if (communityIdObject) {
      // Update community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { recipes: createdRecipe._id },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create recipe: ${error.message}`);
  }
}

export async function deleteRecipe(recipeId: string) {
  connectToDB();

  try {
    const recipe = Recipe.findById(recipeId);

    await Recipe.deleteOne(recipe);

    return;
  } catch (error: any) {
    throw new Error(`Failed to delete recipe: ${error.message}`);
  }
}

export async function fetchRecipeById(recipeId: string) {
  connectToDB();

  try {
    const recipe = await Recipe.findById(recipeId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .exec();

    return recipe;
  } catch (err) {
    console.error("Error while fetching recipe: ", err);
    throw new Error("Unable to fetch recipe");
  }
}
