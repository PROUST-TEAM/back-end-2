import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import passport from 'passport';
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";
export const SocialGoogle =()=>{
    passport.use(new GoogleStrategy({
        clientID : process.env.GOOGLE_ID,
        clientSecret:process.env.GOOGLE_SECRET,
        callbackURL:'/user/google/callback',
    },async(accessToken, refreshToken, profile, done)=>{
        try{
            const exUser =await User.findBySocialId(profile._json.email)
            if(exUser){
                const token =jwt.sign(
                    {
                        userId:exUser.ID.toString(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                ); return done(null, token);
            }else{
                const newUser = await User.addSocialUser(
                    "google",
                    profile._json.email,
                    profile.displayName,
                    null
                );
                const token= jwt.sign(
                    {
                        userId: newUser.ID.toString(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                return done(null,token);
            } 
        }catch(error){
                console.error(error);
                done(error);
            }
        }
    )
    
    );
    }