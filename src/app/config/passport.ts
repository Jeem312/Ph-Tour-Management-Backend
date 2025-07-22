import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";

import { envConfig } from "./env";
import User from "../modules/user/user.models";
import { Role } from "../modules/user/user.interface";

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });
        if (!isUserExist) {
          return done(null, false, { message: "User does not exist" });
        }
const isGoogleAuthenticated = isUserExist.auths?.some(providerObjects => providerObjects.provider === "google");

        if (isGoogleAuthenticated) {
          return done(null, false, { message: "You are authenticated with Google. If you want to login with credentials, then first login with Google and set a password for your Gmail account. After that, you can login with email and password." });
        }
        const isPasswordMatched = await bcryptjs.compare(password, isUserExist.password as string);
        if (!isPasswordMatched) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, isUserExist);
      } catch (error) {
        console.log(error);
        return done(error);
      }
    }
  )
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: envConfig.GOOGLE_CALLBACK_URL,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "No email found" });
        }

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [{ provider: "google", providerId: profile.id }],
          });
        }

        return done(null, user);
      } catch (error) {
        console.log("Google strategy Error", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
