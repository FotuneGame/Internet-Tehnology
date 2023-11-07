const ApiError=require("../error/ApiError");
const {UserSetting}=require("../model/model");
const uuid=require("uuid");
const path=require('path');
const fs = require("fs");



class UserSettingController{
    async Create(req,res,next){
        const {topic,language}=req.body;
        let profile_img=null
        if(req.files && req.files.profile_img) profile_img =req.files.profile_img;

        const {id}=req.user;
        if(!language || !id) {
            return next(ApiError.badRequest("No value"));
        }
        const user_setting_find= await UserSetting.findOne({where:{userId:Number(id)}});
        if (!language || user_setting_find){
            return next(ApiError.badRequest('not normal topic or language or user_have_setting'));
        }
        console.log(profile_img,req.files);
        if(profile_img){
            let fileName=uuid.v4()+".jpg";
            try {
                await profile_img.mv(path.resolve('static', 'avatar', fileName));
                const user_setting = await UserSetting.create({
                    topic,
                    language,
                    profile_img: fileName,
                    userId: Number(id)
                });
                return res.json(user_setting);
            }catch (e){
                console.log(e);
                return next(ApiError.badRequest('error make file: '+e));
            }
        }else{
            const user_setting=await UserSetting.create({topic,language,profile_img:'',userId:Number(id)});
            return res.json(user_setting);
        }
    }
    async Update(req,res,next){
        const {topic,language}=req.body;
        let profile_img=null
        if(req.files && req.files.profile_img) profile_img =req.files.profile_img;

        const {id}=req.user;
        if(!language && !id) {
            return next(ApiError.badRequest("No value"));
        }
        const user_setting_find=await UserSetting.findOne({where:{userId:Number(id)}});
        if(!user_setting_find){
            return next(ApiError.badRequest('HAVE NOT user_setting with userId'));
        }
        let user_setting;
        if(profile_img) {
            let fileName = '';
            fileName = uuid.v4() + ".jpg";
            try {
                await profile_img.mv(path.resolve('static', 'avatar', fileName));
                // удаление файла cтарого
                if (user_setting_find['profile_img']) {
                    fs.unlink(path.resolve( 'static', 'avatar', user_setting_find['profile_img']), err => {
                        if (err) return next(ApiError.internal(err.message));
                    });
                }
            }catch (e){
                console.log(e);
                return next(ApiError.badRequest('error make file: '+e));
            }
            user_setting = await user_setting_find.update({profile_img: fileName});
        }
        user_setting = await user_setting_find.update({topic});
        if(language)user_setting = await user_setting_find.update({language});

        return res.json(user_setting);
    }

    async Get(req,res,next){
        const {id}=req.user;
        if(!id) {
            return next(ApiError.badRequest("No value"));
        }
        const user_setting_find=await UserSetting.findOne({where:{userId:Number(id)}});
        if(!user_setting_find){
            return next(ApiError.badRequest('HAVE NOT user_setting with userId'));
        }
        return res.json(user_setting_find);
    }
}
module.exports=new UserSettingController();
