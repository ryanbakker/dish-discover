"use server";

import { revalidatePath } from "next/cache";
import Community from "../models/community.model";
import Recipe from "../models/recipe.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import fs from "fs/promises";

export async function fetchRecipes() {
  connectToDB();

  // Create a query to fetch recipes
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
  author,
  image,
  ingredients,
  method,
  notes,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 }
    );

    const createdRecipe = await Recipe.create({
      title,
      author,
      image,
      ingredients,
      method,
      notes,
      community: communityIdObject, // Assign Id if provided, or leave blank
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

export async function deleteRecipe(id: string, path: string): Promise<void> {
  try {
    // Connect to the database (you may not need this if you're using a global connection)
    connectToDB();

    // Find the recipe to be deleted
    const mainRecipe = await Recipe.findById(id).populate("author community");

    if (!mainRecipe) {
      throw new Error("Recipe not found");
    }

    // Delete the associated image file if a path is provided
    if (path) {
      await fs.unlink(path);
    }

    // Remove the recipe from MongoDB
    await mainRecipe.remove();
  } catch (error: any) {
    throw new Error(`Failed to delete recipe: ${error.message}`);
  }
}
