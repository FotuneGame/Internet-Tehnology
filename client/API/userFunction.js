import User_server from "./Module/userModule";

//const url = "http://localhost:5000";
const url ="https://gnomehardbass.ru:5050";
const user = new User_server(url);

export default class userFunction{

    static login=async () =>{
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let not_for_session = document.getElementById("not_for_session");
        if(!email || !password || !not_for_session){
            document.getElementById("error").style.display="block";
            return;
        }
        const res = (await user.login(email, password));
        if (!res){
            document.getElementById("error").style.display="block";
        }else{
            if(not_for_session.checked)localStorage.setItem("token",res.token);
            else sessionStorage.setItem("token",JSON.stringify(res.token));
            window.location.href="index.html";
        }
    }

    static register=async () =>{
        let not_for_session = document.getElementById("not_for_session");
        let login_name = document.getElementById("login_name").value;
        //ранится в виде "почта"
        let email = sessionStorage.getItem('email');
        email=email.substring(1,email.length-1);
        let password = document.getElementById("password").value;
        let password_again = document.getElementById("password_again").value;

        if(!login_name || !email || !password || !password_again || (password!==password_again) || !not_for_session){
            document.getElementById("error").style.display="block";
            return;
        }
        const res = await user.registration(login_name,email,password);
        if (!res){
            document.getElementById("error").style.display="block";
        }else{
            if(not_for_session.checked)localStorage.setItem("token",res.token);
            else sessionStorage.setItem("token",JSON.stringify(res.token));
            window.location.href="index.html";
        }
    }
    static confirm=async ()=>{
        let email = document.getElementById("email").value;
        if(!email){
            document.getElementById("error").style.display="block";
            return;
        }
        const res = await user.confirm(email);
        if (!res){
            document.getElementById("error").style.display="block";
        }else{
            sessionStorage.setItem("forgot",false);
            sessionStorage.setItem('email',JSON.stringify(email));
            window.location.href="code_answer.html";
        }
    }

    static code_answer=async ()=>{
        //ранится в виде "почта"
        let email = sessionStorage.getItem('email');
        email=email.substring(1,email.length-1);
        let code = document.getElementById("code").value;
        if(!code || !email){
            document.getElementById("error").style.display="block";
            return;
        }
        const res = await user.confirm_check(email,code);
        if (!res){
            document.getElementById("error").style.display="block";
        }else{
            var forgot = sessionStorage.getItem("forgot");
            if(forgot==="false")window.location.href="register.html";
            else window.location.href="new_password.html";
        }
    }

    static forgot_password_confirm = async ()=>{
        let email = document.getElementById("email").value;
        if(!email){
            document.getElementById("error").style.display="block";
            return;
        }
        const res = await user.confirm(email);
        if (!res){
            document.getElementById("error").style.display="block";
        }else{
            sessionStorage.setItem("forgot",true);
            sessionStorage.setItem('email',JSON.stringify(email));
            window.location.href="code_answer.html";
        }
    }

    static update_password = async ()=>{
        //ранится в виде "почта"
        let email = sessionStorage.getItem('email');
        email=email.substring(1,email.length-1);
        let password = document.getElementById("password").value;
        let password_again = document.getElementById("password_again").value;

        if(!email || !password || !password_again || (password!==password_again)){
            document.getElementById("error").style.display="block";
            return;
        }
        const res = await user.update_confirm(email,password);
        if (!res){
            document.getElementById("error").style.display="block";
        }else{
            localStorage.setItem("token",res.token);
            window.location.href="index.html";
        }
    }

    static account_edit= async ()=>{
        let login_name = document.getElementById("login_name").value;
        let password = document.getElementById("password").value;
        let password_again = document.getElementById("password_again").value;
        const token = localStorage.getItem("token");
        if(!token || !login_name || !password || !password_again || (password!==password_again)){
            document.getElementById("error").style.display="block";
            return;
        }

        const res = await user.update(token,login_name,password);
        if (!res){
            document.getElementById("error").style.display="block";
        }else{
            localStorage.setItem("token",res.token);
            window.location.href="account.html";
        }
    }

    static exit_account=()=>{
        localStorage.clear();
        sessionStorage.clear();
        window.location.href="index.html";
    }

    static main=async (IsAuth)=>{

        //для отображения пользователя
        const account_name_mobile=document.getElementById("account_name_mobile");
        const account_name=document.getElementById("account_name");

        if(IsAuth && account_name_mobile && account_name){
            const user_result = await user.fromToken(IsAuth);
            if(!user_result){
                sessionStorage.clear();
                localStorage.clear();
                return window.location.reload();
            }
            else{
                account_name_mobile.innerText=user_result.user_name;
                account_name.innerText=user_result.user_name;
            }

            const account_user_name=document.getElementById("account_user_name");
            const account_email=document.getElementById("account_email");

            if(user_result && account_user_name && account_email){
                account_user_name.innerText=user_result.user_name;
                account_email.innerText=user_result.email;
            }
            await this.refresh_token(IsAuth);
        }
    }

    static refresh_token = async (IsAuth_token)=>{
        if(IsAuth_token){
            const res =await user.auth(IsAuth_token);
            if(!res){
                sessionStorage.clear();
                localStorage.clear();
            }else{
                if(sessionStorage.getItem("forgot")){
                    sessionStorage.setItem('token',IsAuth_token);
                }else{
                    localStorage.setItem('token',IsAuth_token);
                }
            }
        }
    }
}