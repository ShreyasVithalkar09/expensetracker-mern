import DEFAULT_CATEGORIES from "../constants.js";
import { Category } from "../models/category.model.js";

const initializeDefaultCategories = async () => {
  try {
    for (const category of DEFAULT_CATEGORIES) {
      const existingCategory = await Category.findOne({
        categoryName: category.categoryName.toLowerCase(),
      });

      if (!existingCategory) {
        await Category.create(category);
      }
    }
  } catch (error) {
    console.log(`Error initializing default categories:: ${error}`);
  }
};

export { initializeDefaultCategories };
