const {User} = require("../model/model");

module.exports=async function (req,res,next){
    if(req.method==="OPTIONS"){
        next();
    }
    try{
        const {id} = req.user;
        const user =await User.findOne({where:{id}});
        if(!user && !(user['role']==="ADMIN")){
            return res.status(401).json({message:"Have not USER or User is not an Admin!"});
        }
        next();
    }catch (e){
        res.status(401).json({message:"user is not admin : "+e});
    }
}