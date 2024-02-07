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
        console.log(profile.id);
        console.log(profile.email);
        try{
            const exUser =await User.findBySocialId(profile.id)
            if(exUser){
                const token =jwt.sign(
                    {
                        userId:exUser.SNSAccountID.toString(),
                    },
                    process.env.JWT_SECRET
                ); return done(null, token);
            }else{
                const newUser = await User.addSocialUser(
                    "google",
                    profile.emails[0].value,
                    profile.displayName,
                    null
                );
                const token= jwt.sign(
                    {
                        userId: newUser.SNSAccountID.toString(),
                    },
                    process.env.JWT_SECRET
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