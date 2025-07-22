import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import { envConfig } from "./env";
import User from "../modules/user/user.models";
import { Role } from "../modules/user/user.interface";


passport.use( 
    new GoogleStrategy(
        {
            clientID:envConfig.GOOGLE_CLIENT_ID,
            clientSecret:envConfig.GOOGLE_CLIENT_SECRET,
            callbackURL:envConfig.GOGGLE_CALLBACK_URL,
        },async(accessToken:string,refreshToken:string,profile:Profile,done:VerifyCallback)=>{

try {

    const email = profile.emails?.[0].value;
    if(!email){
        return done(null,false,{message:"no email found"})
    }
    let user = await User.findOne({email});

    if (!user) {
user = await User.create({
    email,
    name:profile.displayName,
    picture: profile.photos?.[0].value,
    role:Role.USER,
    isVerified:true,
    auths:[
        {
            provider:"google",
            providerId:profile.id,
        }
    ]
})
return done(null,user,)
    }
    
} catch (error) {
    console.log("Google strategy Error",error)
    return done(error)
    
}

        }
    )
)



passport.serializeUser((user:any, done:(err: any, id?: unknown)=>void)=>{
    done(null,user._id)

})

passport.deserializeUser(async(id:string,done:any)=>{
    try {
        const user = await User.findById(id);
        done(null,user)
    } catch (error) {
        console.log(error);
        done(error)
        
    }
})
export default passport;