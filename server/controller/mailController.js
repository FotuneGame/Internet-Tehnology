const ApiError=require("../error/ApiError");
const nodemailer = require("nodemailer");
const send_value = require("../emailHTML/confirm/baseValue");
const {UserConfirm}=require("../model/model");

const transporter=nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.USER_MAIL,
        pass:process.env.PASSWORD_MAIL
    }
})

class MailController{

    async MailSend (req,res,next){
        if(!req.body.email || !req.body.code_email){
            return next(ApiError.badRequest('Not have email and code_email'));
        }
        const mailOptions = {
            from: process.env.MAIL_OPTIONS_FROM,
            to: req.body.email,
            headers: send_value.headers,
            subject: send_value.subject,
            text: send_value.text,
            html: send_value.html(req.body.code_email)
        }

        await transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return next(ApiError.badRequest("Cannot send mail ("+err+")"));
            }
            return res.json(info);
        });
    }

    async Check(req,res,next){
        if(!req.body.email || !req.body.code_email ){
            return next(ApiError.badRequest("Not email and not code_email"));
        }
        const user_confirm=await UserConfirm.findOne({where:{email:req.body.email}});
        if(!user_confirm){
            return next(ApiError.badRequest("have not user_cofirm"));
        }
        else{
            if(user_confirm['confirm']){
                return res.json(true);
            }
            if(user_confirm['code_email']===Number(req.body.code_email)){
                let date=Date.parse(user_confirm['data_create_code_email']);
                let date_code_email=new Date(date);
                let date_now=new Date();
                let date_res=new Date(date_now-date_code_email);
                if(date_res.getMinutes()<process.env.CODE_ACTIVE){
                    if(!user_confirm['confirm'])await user_confirm.update({confirm:true});
                    return res.json(true);
                }
            }
            return next(ApiError.badRequest("code is not valid"));
        }
    }
}

module.exports=new MailController();