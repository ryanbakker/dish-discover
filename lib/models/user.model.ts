import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String,
  bio: String,
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
});

// Explicitly tell Mongoose to use the 'id' field as the primary key
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
