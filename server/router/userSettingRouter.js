const Router=require("express");
const router=new Router();

//импорт контроллеров и мидлвейеров
const UserSetting=require("../controller/userSettingController");
const Authware=require("../midleware/Authware");

//сами запросы (сначала мидл вейры, затем контроллеры)
router.post("/create",Authware,UserSetting.Create);
router.post("/update",Authware,UserSetting.Update);
router.post("/get",Authware,UserSetting.Get);


module.exports=router;