import passport from 'passport';
import {Strategy as KakaoStrategy} from 'passport-kakao';

import jwt from "jsonwebtoken";
import {User} from "../models/user.js";
export const SocialKakao =()=>{
    passport.use(new KakaoStrategy({
        clientID : process.env.KAKAO_ID,
        callbackURL:'/user/kakao/callback',
    },async(accessToken, refreshToken, profile, done)=>{
        try{
            const exUser =await User.findBySocialId(profile._json.kakao_account.email)
            if(exUser){
                const token =jwt.sign(
                    {
                        userId:exUser.ID.toString(),
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                ); 
                 return done(null, token);
            }else{
                const newUser = await User.addSocialUser(
                    "kakao",
                    profile._json.kakao_account.email,
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
    };