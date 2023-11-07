require("dotenv").config();
const express = require("express");
const sequelize=require("./database");
const fileUpload=require("express-fileupload");
const cors=require("cors");
const ErrorWare = require("./midleware/ErrorWare");
const router=require('./router/index');     // настройка запросов
const path = require('path');

// для настройки https
const https = require('https');
const fs = require('fs');
const options = {
    cert: fs.readFileSync('../sslcert/fullchain.pem'),
    key: fs.readFileSync('../sslcert/privkey.pem')
};

//модели сервера (если не созданы таблицы то они создадутся и выстроят между собой связи)
const models_loader=require("./model/model");
const PORT =process.env.PORT || 5000;

const create_midlleware_base = async ()=> {
    const app = express();
    app.use(cors({
        origin: process.env.URL_CORS,                   // откуда могут быть запросы
        allowedHeaders:['Authorization','Content-Type'] // виды заголовков в запросах
    })); //CORS для всех маршурутов (механизм "общения" с сервисами разных доменов)
    app.use(express.json());// для получения объекта вида json запроса помещённого в requset
    //путь куда какчаем файл, затем указываем кол-во файлов для загрузки
    app.use('/static',express.static(process.env.MAIN_DIRECTORY));// для работы со статичными файлами c ГЛАВНОЙ ДИРЕКТОРИИ
    // создает папку родительскую
    app.use(fileUpload({createParentPath: true}));                           //для работы с файлами
    app.use("/api",router);//роутинг запросов
    app.use(ErrorWare);//проверка на тип ошибки (Обязательно после всех мидлвейеров)
    return app;
}
const start=async ()=>{
    try{
        const app =  await create_midlleware_base();
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,()=>{console.log("server started on PORT: ",PORT)});
        // подключать ток для сервака
        //https.createServer(options, app).listen(PORT,()=>{console.log("server started HTTPS on PORT: ",PORT)});
    }catch (e){
        console.log(e);
    }
}
start();