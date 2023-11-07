const Router=require("express");
const router=new Router();
const path = module.require('path');


//загрузка html страниц по http запросам
router.get("/",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","index.html"));
});
router.get("/main",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","index.html"));
});
router.get("/about",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","about.html"));
});
router.get("/login",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","login.html"));
});
router.get("/register",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","register.html"));
});
router.get("/register_email",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","register_email.html"));
});
router.get("/forgot_password",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","forgot_password.html"));
});
router.get("/new_password",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","new_password.html"));
});
router.get("/code",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","code_answer.html"));
});
router.get("/account",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","account.html"));
});
router.get("/account_edit",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","account_edit.html"));
});
router.get("/not_found",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"..","public","page","not_found.html"));
});


// для подключения js файлов API
const APIRouter =require("./APIRouter");
router.use("/API",APIRouter);

module.exports=router;