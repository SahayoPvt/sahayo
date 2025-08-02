import express from 'express';
import cookieParser from 'cookie-parser';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import cart from './routes/cartRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware  from './middleware/error.js';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
import  cors  from 'cors';
const app=express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET","PUT","DELETE"],
  credentials: true
}));
// Middleware
app.use(cors())
app.use(express.json())
// app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(fileUpload({ useTempFiles: true })); // <-- update this line
// 
// Route
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",cart)
app.use("/api/v1",order)
app.use("/api/v1",payment)

app.use(errorHandleMiddleware)
dotenv.config({path:'backend/config/config.env'})
export default app;