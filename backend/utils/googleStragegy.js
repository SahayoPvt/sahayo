// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import * as passport from 'passport';
// import { loginwithgoogle } from '../controllers/authcontrollers.js';

// export const googleProvider=new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL:  process.env.GOOGLE_CALLBACK
//   },
//   async(accessToken, refreshToken, profile, cb)=> {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//      await loginwithgoogle(profile,cb);
//   }

// )



// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import passport from './passport.js'; // use your passport wrapper
// import { loginwithgoogle } from '../controllers/authcontrollers.js';


// export const googleProvider = new GoogleStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     await loginwithgoogle(profile, done);
//   }
// );

// passport.use(googleProvider);
