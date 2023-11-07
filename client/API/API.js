import userFunction from "./userFunction";
import userSettingFunction from "./userSettingFunction"


const url_client = "http://localhost:3000";
//const url_client = 'https://gnomehardbass.ru';
// цепляем прослушивание для кнопок
const btn_event = [
    {
        'name':'btn_login',
        'function':userFunction.login
    },
    {
        'name':'btn_register',
        'function':userFunction.register
    },
    {
        'name':'btn_confirm',
        'function':userFunction.confirm
    },
    {
        'name':'btn_code_answer',
        'function':userFunction.code_answer,
    },
    {
        'name':'btn_exit_account',
        'function':userFunction.exit_account,
    },
    {
        'name':'btn_exit_account_mobile',
        'function':userFunction.exit_account,
    },
    {
        'name':'btn_forgot_password',
        'function':userFunction.forgot_password_confirm,
    },
    {
        'name':'btn_update_password',
        'function':userFunction.update_password,
    },
    {
        'name':'btn_account_edit',
        'function':userFunction.account_edit,
    },
    {
        'name':'btn_edit_setting',
        'function':userSettingFunction.edit_setting,
    },
]

btn_event.forEach((obj)=>{
    const btn=document.getElementById(obj['name']);
    if(btn)btn.addEventListener("click",obj['function']);
});

//выполнение проверок на вход в акк
let isSession =null;
if(sessionStorage.getItem("token"))isSession = sessionStorage.getItem("token").substring(1,sessionStorage.getItem("token").length-1)
const IsAuth = localStorage.getItem("token") || isSession;


await userFunction.main(IsAuth);
await userSettingFunction.main(IsAuth);

// не самое удачное решение, можно было следить мидлвейром в роутере проверяя онлайн в бд, (но тут онлайн храниться в токене у клиента)
// => нельзя вместе склеить веб и node js
// => редирект на другие страницы (в случае входа и выхода из акк)
if(IsAuth){
    const redirect_to_none=[
        url_client+"/code_answer.html",
        url_client+"/code_answer",
        url_client+"/forgot_password.html",
        url_client+"/forgot_password",
        url_client+"/login.html",
        url_client+"/login",
        url_client+"/new_password.html",
        url_client+"/new_password",
        url_client+"/register.html",
        url_client+"/register",
        url_client+"/register_email.html",
        url_client+"/register_email"
    ]
    if(redirect_to_none.includes(window.location.href)){
        window.location.href=url_client+"/not_found.html";
    }
}else{
    const redirect_to_none=[
        url_client+"/account.html",
        url_client+"/account",
        url_client+"/account_edit.html",
        url_client+"/account_edit",
    ]
    if(redirect_to_none.includes(window.location.href)){
        window.location.href=url_client+"/not_found.html";
    }
}

//отключение лоадера
const loader = document.getElementById('loader_main');
if(loader){
    loader.classList.add('loader-end');
}
