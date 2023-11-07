const Router=require("express");
const router=new Router();

//  импорт контроллеров и мидлвейеров
const UserController=require("../controller/userController");
const MailSendController=require("../controller/mailController");
const Authware=require("../midleware/Authware");
const GenerationCodeware=require("../midleware/GenerationCodeware");

//  сами запросы (сначала мидл вейры, затем контроллеры)
router.post("/registration",UserController.reqistration);
router.post("/login",UserController.login);
router.post("/update",Authware,UserController.update);
router.post('/auth',Authware,UserController.check);
router.post('/get',UserController.getInfoUser);
router.post('/from_token',UserController.decodeToken);
router.post('/confirm',GenerationCodeware,MailSendController.MailSend);
router.post('/confirm_check',MailSendController.Check);
router.post('/restore',UserController.updateConfirm);

module.exports=router;