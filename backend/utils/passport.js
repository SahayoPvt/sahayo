// import passport from "passport";

// // passport.serializeUser((user, done) => {
// //   done(null, user);
// // });

// // passport.deserializeUser((user, done) => {
// //   done(null, user);
// // });

// import User from "../models/userModel.js"
// passport.serializeUser((user, done) => {
//   done(null, user._id); // Preferably user._id
// });
// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });


// export default passport;



// import passport from "passport";
// import User from "../models/userModel.js";

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// export default passport;



import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID || "218859081949-8pf15oal9uc4lsqk1l4dqco77tmhs46f.apps.googleusercontent.com",
      clientSecret: process.env.CLIENT_SECRET || "218859081949-8pf15oal9uc4lsqk1l4dqco77tmhs46f.apps.googleusercontent.com",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, callback) => {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
