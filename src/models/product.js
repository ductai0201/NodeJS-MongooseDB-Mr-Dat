import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: Number,
});

export default mongoose.model("Product",productSchema)
