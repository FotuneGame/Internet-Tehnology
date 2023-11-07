const ApiError=require("../error/ApiError");
const bcript=require("bcrypt");
const jwt=require("jsonwebtoken");
const {User, UserConfirm}=require("../model/model");

const generateJWT=(id,user_name,email,role)=>{
    return jwt.sign({id,user_name,email,role},process.env.SECRET_KEY,{expiresIn:"24h"});
}
class UserController {
    async reqistration(req, res, next) {
        const {user_name, email, password} = req.body;
        if (!email || !password || !user_name) {
            return next(ApiError.badRequest('not normal email or password or user_name'));
        }
        const condidate = await User.findOne({where: {email}});
        if (condidate) {
            return next(ApiError.badRequest('user is used'));
        }

        // проверка на подтверждённую почту и телефон
        const user_confirm = await UserConfirm.findOne({where: {email}});
        if (!user_confirm) return next(ApiError.badRequest("user is not confirm"));
        else if (!user_confirm['confirm']) return next(ApiError.badRequest("user is not confirm yet"));

        const hashPassword = await bcript.hash(password, 5);
        const user = await User.create({user_name, email, password: hashPassword});
        const token = generateJWT(user.id,user_name, email, user.role);
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("No value"));
        }
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(ApiError.internal("user have not in data base"));
        }
        let comparePassword = await bcript.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("password is not true"));
        }

        const token = generateJWT(user.id,user.user_name, email, user.role);
        return res.json({'token':token});
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id,req.user.user_name, req.user.email, req.user.role);
        return res.json({token});
    }

    async decodeToken(req, res, next){
        const token=req.headers.authorization.split(" ")[1];//Bearer addsadsad
        if(!token && token!=="undefined"){
            return next(ApiError.badRequest("user is not authorization"));
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded) {
                return next(ApiError.badRequest("cannot decoded token"));
            }
            if (!decoded.id || !decoded.user_name || !decoded.email || !decoded.role) {
                return next(ApiError.badRequest("not all info about user"));
            }

            return res.json(decoded);
        }catch (e){
            return next(ApiError.badRequest("Not normal token:" +e.message));
        }
    }

    async update(req, res, next) {
        const {user_name, password} = req.body;
        const {id,email} = req.user;
        if (!password && !user_name && !id) {
            return next(ApiError.badRequest('Have not value'));
        }
        const user = await User.findOne({where: {id:Number(id)}});
        if (!user) {
            return next(ApiError.badRequest('user is NOT used'));
        }

        // проверка на подтверждённую почту и телефон
        const user_confirm = await UserConfirm.findOne({where: {email}});
        if (!user_confirm) return next(ApiError.badRequest("user is not confirm"));
        else if (!user_confirm['confirm']) return next(ApiError.badRequest("user is not confirm yet"));

        let user_update;

        if(user_name)user_update = await user.update({user_name});
        if(password){
            const hashPassword = await bcript.hash(password, 5);
            user_update = await user.update({password: hashPassword});
        }

        const token = generateJWT(user_update.id,user_update.user_name, user_update.email, user_update.role);
        return res.json({token});
    }

    async getInfoUser(req, res, next) {
        if (!req.body.email) {
            return next(ApiError.badRequest("Have not email!"));
        }
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user) return res.json(false);
        else return res.json({
            id: user['id'],
            user_name: user['user_name'],
            email: user['email'],
            role: user['role']
        });

    }

    async updateConfirm(req, res, next) {
        if (!req.body.email || !req.body.password) {
            return next(ApiError.badRequest("Have not email and password!"));
        }
        const user = await User.findOne({where: {email: req.body.email}});
        if (!user) return res.json(false);

        // проверка на подтверждённую почту и телефон
        const user_confirm = await UserConfirm.findOne({where: {email:req.body.email }});
        if (!user_confirm) return next(ApiError.badRequest("user is not confirm"));
        else if (!user_confirm['confirm']) return next(ApiError.badRequest("user is not confirm yet"));

        const hashPassword = await bcript.hash(req.body.password, 5);
        const user_update=await user.update({password: hashPassword});

        const token = generateJWT(user_update.id,user_update.user_name, user_update.email, user_update.role);
        return res.json({token});
    }
}
module.exports=new UserController();