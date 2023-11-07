var IsAuth = localStorage.getItem("token");
// sign_out - класс пользователя кто не вошел в акк , sign - наоборот
var sign_out_obj=document.getElementsByClassName("sign_out");
var sign_obj=document.getElementsByClassName("sign");

if(IsAuth) {
    for (var i = 0; i < sign_out_obj.length; i++) {
        sign_out_obj[i].style.display = "none";
    }

    for (var i = 0; i < sign_obj.length; i++) {
        sign_obj[i].style.display = "block";
    }
}else{
    for (var i = 0; i < sign_out_obj.length; i++) {
        sign_out_obj[i].style.display = "block";
    }

    for (var i = 0; i < sign_obj.length; i++) {
        sign_obj[i].style.display = "none";
    }
}
