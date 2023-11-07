const ApiError=require("../error/ApiError");

// ловит статус ошибки (сравнивая ее тип с типом класса ApiError)
module.exports=function (err,req,res,next){
    if(err instanceof ApiError){
        return res.status(err.status).json({message:err.message});
    }
    return res.status(500).json({message:"unknow error on server"});
}