const jwt=require("jsonwebtoken");

module.exports=function (req,res,next){
    if(req.method==="OPTIONS"){
        next();
    }
    try{
        const token=req.headers.authorization.split(" ")[1];//Bearer addsadsad
        if(!token){
            return res.status(401).json({message:"user is not authorization"});
        }
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        req.user=decoded;
        if(!req.user.id || !req.user.user_name  || !req.user.email || !req.user.role) {
            return res.status(401).json({message:"not all info about user"});
        }
        next();
    }catch (e){
        res.status(401).json({message:"user is not authorization :"+e});
    }
}