import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  path: { type: String, required: true, unique: true },
});

export const Category = model<ICategory>("Category", CategorySchema);
