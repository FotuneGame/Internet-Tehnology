export default class User_server{
    constructor (url){
        this.url=url;
    }

    async registration (user_name,email,password){
        return await  fetch(this.url+"/api/users/registration",{
            method:"POST",
            body: JSON.stringify({
                user_name:user_name,
                email:email,
                password:password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }

    async login (email,password){
        return await  fetch(this.url+"/api/users/login",{
            method:"POST",
            body: JSON.stringify({
                email:email,
                password:password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }

    async update (token,user_name=null,password=null){
        return await  fetch(this.url+"/api/users/update",{
            method:"POST",
            body: JSON.stringify({
                user_name:user_name,
                password:password
            }),
            headers:{
                "Content-Type": "application/json",
                'authorization':"Bearer "+token
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }

    async auth (token){
        return await  fetch(this.url+"/api/users/auth",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                'authorization':"Bearer "+token
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }
    async get (email){
        return await  fetch(this.url+"/api/users/get",{
            method:"POST",
            body: JSON.stringify({
                email:email
            }),
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }

    async fromToken (token){
        return await  fetch(this.url+"/api/users/from_token",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                'authorization':"Bearer "+token
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }

    async confirm (email){
        return await  fetch(this.url+"/api/users/confirm",{
            method:"POST",
            body: JSON.stringify({
                email:email,
            }),
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }
    async confirm_check (email,code_email){
        return await  fetch(this.url+"/api/users/confirm_check",{
            method:"POST",
            body: JSON.stringify({
                email:email,
                code_email:code_email,
            }),
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }

    async update_confirm (email,password){
        return await  fetch(this.url+"/api/users/restore",{
            method:"POST",
            body: JSON.stringify({
                email:email,
                password:password
            }),
            headers:{
                "Content-Type": "application/json",
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }
}
