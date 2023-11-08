"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Community from "../models/community.model";
import Recipe, { RecipeType } from "../models/recipe.model";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";

// Fetch User with Id
export async function fetchUser(userId: string) {
  try {
    const user = await User.findById(userId, "id name username image bio");
    return user;
  } catch (error) {
    console.error("Error fetching user: ", error);
    return null;
  }
}

export async function fetchUsers() {
  connectToDB();

  try {
    const users = await User.find({}, "id name username image");

    console.log(users);

    return { users };
  } catch (error) {
    console.error("Error fetching users: ", error);
    return { users: [] };
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function fetchUserRecipes(userId: string): Promise<RecipeType[]> {
  try {
    const recipes = await Recipe.find({ author: userId })
      .populate({
        path: "community",
        model: "Community",
        select: "name id image _id",
      })
      .lean(); // Use the lean() method to convert results to plain JavaScript objects

    return recipes as RecipeType[];
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    throw error;
  }
}

export async function fetchUserById(
  userId: string
): Promise<typeof User | null> {
  connectToDB();

  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
