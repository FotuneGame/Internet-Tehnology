module.require("dotenv").config();
const express = module.require("express");
const path = module.require('path');

// для настройки https
const https = require('https');
const fs = require('fs');
const options = {
    cert: fs.readFileSync('../sslcert/fullchain.pem'),
    key: fs.readFileSync('../sslcert/privkey.pem')
};

const router=require('./router/index');

const PORT =process.env.PORT || 3000;

const create_midlleware_base = async ()=> {
    const app = express();
    console.log("Express static folder: "+path.resolve(__dirname, process.env.MAIN_DIRECTORY));
    app.use(express.static(process.env.MAIN_DIRECTORY));// для работы со страницами файлами c ГЛАВНОЙ ДИРЕКТОРИИ
    app.use("/",router);
    return app;
}

const start=async ()=>{
    try{
        const app =  await create_midlleware_base();
        app.listen(PORT,()=>{console.log("client started on PORT: ",PORT)});
        // подключать ток для сервака
        //https.createServer(options, app).listen(PORT,()=>{console.log("client started HTTPS on PORT: ",PORT)});
    }catch (e){
        console.log(e);
    }
}
start();