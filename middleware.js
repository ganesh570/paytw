const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('./config.js');

function authMiddleware(req,res,next){
    let authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({message:"Invalid attempt"});
    }

    try{
        let token=authHeader.replace('Bearer ','');
        const decoded=jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            res.status(403).json({message:"Invalid attempt"});
        }
        
    }catch(err){
        res.status(403).json({message:"Invalid attempt"});
    }
}

module.exports={authMiddleware};