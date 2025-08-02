import mongoose from "mongoose";


export const connectMongoDatabase = () => {
  mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/ecommerce"
).then((data) => {
    console.log(`MongoDB connected with server ${data.connection.host}`);
  });
};