// import passport from 'passport';
// import { Strategy as JwtStrategy } from 'passport-jwt';
// import { getUser } from '../models/authModels'; 

// const cookieExtractor = (req:any)=>{
//     let token = null;
//     if (req && req.cookies) {
//         token = req.cookies['token'];
        
//     }
//     return token;
// }


// const opts = {
//     jwtFromRequest: cookieExtractor,
//     secretOrKey: String(process.env.SECRET_KEY),
// };


// passport.use(new JwtStrategy(opts, async (jwt_payload, done) =>{
//     try{
        
//     const user = await getUser(jwt_payload.email);

    
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     }catch(err){
//         return done(err, false);
//     }
// }));


// export default passport;