
export default class User_setting_server{

    constructor(url) {
        this.url=url;
    }

    async create (token,topic,language,profile_img=null ){
        var formData= new FormData();
        formData.append('topic',topic);
        formData.append('language',language);
        formData.append('profile_img',profile_img);

        return await  fetch(this.url+"/api/user_settings/create",{
            method:"POST",
            body:formData,
            headers:{
                'authorization': "Bearer "+ token
            },
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }
    async update (token,topic=null,language=null,profile_img=null ){
        var formData= new FormData();
        formData.append('topic',topic);
        formData.append('language',language);
        formData.append('profile_img',profile_img);

        return await  fetch(this.url+"/api/user_settings/update",{
            method:"POST",
            body:formData,
            headers:{
                'authorization': "Bearer "+ token
            },
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }

    async get (token){
        return await  fetch(this.url+"/api/user_settings/get",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                'authorization': "Bearer "+ token
            }
        }).then((response)=>{
            if (!response.ok) {
                return false;
            }
            return response.json();
        }).catch(e=>console.log(e));
    }
}