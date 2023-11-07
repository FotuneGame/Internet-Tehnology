const {UserConfirm}=require("../model/model");

module.exports=async function (req,res,next){
    if(req.method==="OPTIONS"){
        const code_email=Math.floor(100000+Math.random()*900000);
        req.body.code_email=code_email;
        next();
    }
    try{
        if(!req.body.email){
            return res.status(401).json({message:"Not email"});
        }
        const user_confirm=await UserConfirm.findOne({where:{email:req.body.email}});

        const code_email=Math.floor(100000+Math.random()*900000);

        if(!user_confirm){
            await UserConfirm.create({email:req.body.email,code_email:code_email});
        }else{
            await user_confirm.update({code_email:code_email,confirm:false,data_create_code_email:Date.now()});
        }

        req.body.code_email=code_email;
        next();
    }catch (e){
        res.status(401).json({message:"Error : "+e});
    }
}