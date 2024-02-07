import {Strategy as NaverStrategy} from 'passport-naver';
import passport from 'passport';
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";
export const SocialNaver =()=>{
    passport.use(new NaverStrategy({
        clientID : process.env.NAVER_ID,
        clientSecret:process.env.NAVER_SECRET,
        callbackURL:'/user/naver/callback',
    },async(accessToken, refreshToken, profile, done)=>{
        try{
            const exUser =await User.findBySocialId(profile.emails[0].value)
            if(exUser){
                const token =jwt.sign(
                    {
                        userId:exUser.SNSAccountID.toString(),
                    },
                    process.env.JWT_SECRET
                ); return done(null, token);
            }else{
                const newUser = await User.addSocialUser(
                    "naver",
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
};