const sequelize=require("../database");
const {DataTypes}=require("sequelize");

const User = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    user_name:{type:DataTypes.STRING(64),allowNull: false},
    email:{type:DataTypes.STRING(64),unique:true,allowNull: false},
    password:{type:DataTypes.STRING(512),allowNull: false},
    role:{type:DataTypes.STRING(16),defaultValue:"USER",allowNull: false},
});

const UserSetting = sequelize.define('user_setting',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    topic:{type:DataTypes.BOOLEAN},
    language:{type:DataTypes.STRING(4)},
    profile_img:{type:DataTypes.STRING(256),defaultValue:""},
});

const UserConfirm=sequelize.define('user_confirm',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email:{type:DataTypes.STRING(64),unique:true,allowNull:false},
    code_email:{type:DataTypes.INTEGER},
    data_create_code_email:{type:DataTypes.DATE,allowNull: false, defaultValue: sequelize.fn('NOW')},
    confirm:{type:DataTypes.BOOLEAN,defaultValue:false}
});


// настройки связей

User.hasOne(UserSetting);
UserSetting.belongsTo(User);

module.exports={
    User,
    UserSetting,
    UserConfirm
}



