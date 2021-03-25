const jwt = require('jsonwebtoken');
require('dotenv').config;
module.exports = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    if(!token || token == ''){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,process.env.TOKEN_KEY)
    }
    catch(err){
    req.isAuth = false;
    return next();
    }
    console.log('00000',decodedToken)

    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    console.log('26')
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();

}