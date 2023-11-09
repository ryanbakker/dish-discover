import mongoose, { Document, Schema } from "mongoose";

interface RecipeType extends Document {
  title: string;
  image: string;
  ingredients: string;
  method: string;
  notes: string;
  createdAt: Date;
  author: Schema.Types.ObjectId;
}

const recipeSchema = new mongoose.Schema<RecipeType>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: { type: String, required: true },
  method: { type: String, required: true },
  notes: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Recipe =
  mongoose.models.Recipe || mongoose.model<RecipeType>("Recipe", recipeSchema);

export type { RecipeType };
export default Recipe;
