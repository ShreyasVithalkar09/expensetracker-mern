import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { initializeDefaultCategories } from "./utils/helper.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then( async () => {
    app.on("error",(error)  => {
      console.log(`ERROR:: ${error}`);
      throw error
    });

    await initializeDefaultCategories();

    const PORT = process.env.PORT;

    app.listen(PORT || 4001, () => {
      console.log(`Server is running on port:: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGODB CONNECTION ERROR:: ${error}`);
  });
