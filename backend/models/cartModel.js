import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});


export default mongoose.model("Cart", cartSchema);
