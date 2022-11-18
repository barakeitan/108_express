const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
    // faker.seed(0);
    
        try {
            const categories = {
                "Laptops": "https://www.youtube.com/watch?v=wqFzwWRdteM",
                "Electronics": "https://www.youtube.com/watch?v=LN6EuNqxOwE",
                "Backpacks": "https://www.youtube.com/watch?v=4NBaouhmcBs",
                "Large Handbags": "https://www.youtube.com/watch?v=RJmjF2OVF8A",
                "Mini Bags": "https://www.youtube.com/shorts/v2Sw0nXDbZA",
                "Kitbags": "https://www.youtube.com/shorts/5ITThRplr_Y",
                "Office Supplies": "https://www.youtube.com/watch?v=EJDhLbzkjOM"
            }
        //   const allProducts = await Product.find({}).populate("category");
        const products = Product.aggregate( [ { $group : { category : "title" } } ])
          sw
          for (let i = 0; i < allProducts.length; i++) {
            // await Product.updateMany();
            // allProducts[i].video = "";
            // await allProducts[i].save()
              
              allProducts[i].video = categories[allProducts[i].category.title]
              await allProducts[i].save();
          }
        } catch (error) {
          console.log(error);
          return error;
        }
    
    //   await seedProducts(backpacks_titles, backpacks_imgs, "Backpacks");
    
      
}

async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

await seedDB();
await closeDB();
