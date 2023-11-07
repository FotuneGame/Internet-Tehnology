const Router=require("express");
const router=new Router();

const userRouter = require("./userRouter");
const userSettingRouter = require("./userSettingRouter");


router.use("/users",userRouter);
router.use("/user_settings",userSettingRouter);


module.exports=router;