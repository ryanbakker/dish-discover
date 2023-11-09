"use server";

import { revalidatePath } from "next/cache";
import Recipe from "../models/recipe.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function fetchRecipes() {
  try {
    connectToDB();

    const recipes = await Recipe.find().populate({
      path: "author",
      model: User,
    });

    return { recipes };
  } catch (error: any) {
    throw new Error(`Failed to fetch recipes: ${error.message}`);
  }
}

interface Params {
  title: string;
  image: string;
  ingredients: string;
  method: string;
  author: string;
  notes: string;
  path: string;
}

export async function createRecipe({
  title,
  image,
  ingredients,
  method,
  notes,
  author,
  path,
}: Params) {
  try {
    connectToDB();

    const createdRecipe = await Recipe.create({
      title,
      author,
      image,
      ingredients,
      method,
      notes,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { recipes: createdRecipe._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create recipe: ${error.message}`);
  }
}

export async function deleteRecipe(recipeId: string) {
  connectToDB();

  try {
    const recipe = Recipe.findById(recipeId).populate("author");

    console.log("Recipe found = ", recipe);

    await Recipe.deleteOne(recipe);

    console.log("Recipe Deleted");

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
        select: "_id id name image username",
      })
      .exec();

    return recipe;
  } catch (err) {
    console.error("Error while fetching recipe: ", err);
    throw new Error("Unable to fetch recipe");
  }
}
