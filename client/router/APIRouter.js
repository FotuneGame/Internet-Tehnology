const Router=require("express");
const router=new Router();
const path = module.require('path');


router.get("/API.js",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","API","API.js"));
});
router.get("/userFunction",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","API","userFunction.js"));
});
router.get("/userSettingFunction",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","API","userSettingFunction.js"));
});
router.get("/Module/userModule",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","API","Module","userModule.js"));
});
router.get("/Module/userSettingModule",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","API","Module","userSettingModule.js"));
});


module.exports=router;