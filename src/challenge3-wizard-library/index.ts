import express from "express";
import { Request, Response } from "express";
import { connectDB } from "./db";
import { Category } from "./category.model";

const app = express();
app.use(express.json());

// Create root category
app.post("/categories", async (req: Request, res: any) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Missing category name" });
    const category = await Category.create({ name, path: name });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Create subcategory
app.post("/categories/:parentName/sub", async (req: Request, res: any) => {
  try {
    const { parentName } = req.params;
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ error: "Missing subcategory name" });

    const parentCategory = await Category.findOne({ name: parentName });
    if (!parentCategory) {
      return res
        .status(404)
        .json({ error: `Parent category "${parentName}" not found` });
    }

    const path = `${parentCategory.path}|${name}`;
    const subcategory = await Category.create({ name, path });
    return res.status(201).json(subcategory);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Get subcategories
app.get("/categories/:parentName/sub", async (req: Request, res: any) => {
  try {
    const { parentName } = req.params;
    const parentCategory = await Category.findOne({ name: parentName });
    if (!parentCategory) {
      return res
        .status(404)
        .json({ error: `Category "${parentName}" not found` });
    }

    const regex = new RegExp(`^${parentCategory.path}(\\|.*)?$`);
    const subcategories = await Category.find({ path: { $regex: regex } }).sort(
      { path: 1 }
    );
    return res.json(subcategories);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Start server
async function startServer() {
  try {
    await connectDB(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wizard-library"
    );
    app.listen(3001, () => console.log("Server is running on port 3001"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

