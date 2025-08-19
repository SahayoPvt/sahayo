// import express from 'express';
// import cookieParser from 'cookie-parser';
// import product from './routes/productRoutes.js';
// import user from './routes/userRoutes.js';
// import cart from './routes/cartRoutes.js';
// import order from './routes/orderRoutes.js';
// import payment from './routes/paymentRoutes.js';
// import google from './routes/googleLoginRoutes.js';
// import errorHandleMiddleware from './middleware/error.js';
// import fileUpload from 'express-fileupload';
// import cors from 'cors';
// import passport from 'passport';
// import session from 'express-session';
// import { googleProvider } from './utils/googleStragegy.js';
// const app = express();
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: ["POST", "GET", "PUT", "DELETE"],
//   credentials: true
// }));


// app.use(cors())
// app.use(express.json())
// // app.use(fileUpload())
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }));
// app.use(cookieParser())
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(googleProvider)

// // app.use(fileUpload({ useTempFiles: true })); // <-- update this line

// app.use("/api/v1", product)
// app.use("/api/v1", user)
// app.use("/api/v1", cart)
// app.use("/api/v1", order)
// app.use("/api/v1", payment)
// app.use("/api/v1", google)


// app.use(errorHandleMiddleware)

// export default app;



import express from 'express';
import cookieParser from 'cookie-parser';
import passport from './utils/passport.js'; // Import your passport wrapper
// import { googleProvider } from './utils/googleStrategy.js'; // Ensures the strategy is registered

import cors from 'cors';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import cart from './routes/cartRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
// import google from './routes/googleLoginRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieSession from "cookie-session";
import authRoute from "./routes/authRoutes.js"
const app = express();

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use("/api/v1", payment);
// app.use("/api/v1", login);


app.use("/api/v1/", authRoute);
app.use(errorHandleMiddleware);

export default app;
