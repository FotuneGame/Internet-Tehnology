import User_setting_server from "./Module/userSettingModule";

const url_client = "http://localhost:3000";
//const url_client = 'https://gnomehardbass.ru';
const url = "http://localhost:5000";
//const url ="https://gnomehardbass.ru:5050";
const user_setting = new User_setting_server(url);

export default class userSettingFunction{
    static edit_setting = async ()=>{
        let isSession =null;
        if(sessionStorage.getItem("token"))isSession = sessionStorage.getItem("token").substring(1,sessionStorage.getItem("token").length-1)
        let IsAuth = localStorage.getItem("token") || isSession;
        if(!IsAuth)return console.log("не активный аккаунт?");

        let ava_files = document.getElementById("ava_file").files;
        const language = document.querySelector('input[name="language"]:checked').id;
        const topic = document.getElementById('flex_checkedbox_topyc').checked;

        if(!(language==='rus' || language==='eng'))return console.log("what are you doing here?");
        if(ava_files.length===0) ava_files=null;
        else ava_files=ava_files[ava_files.length-1];
        console.log(ava_files)
        if(ava_files) {
            if (ava_files.type !== 'image/png' && ava_files.type !== 'image/jpeg' || ava_files.size >= 16777216) {
                document.getElementById("error").style.display = "block";
                return;
            }
        }
        var res_find = await user_setting.get(IsAuth);
        if(!res_find){
            const res = await user_setting.create(IsAuth,topic,language,ava_files);
            if(!res) console.log("создать настройки не удалось: " + res);
        }else {
            const res = await user_setting.update(IsAuth,topic,language,ava_files);
            if(!res) console.log("обновить настройки не удалось: " + res);
        }
        window.location.href="account.html";
    }

    static main = async (IsAuth)=>{
        if(IsAuth) {
            const res_find = await user_setting.get(IsAuth);
            if (res_find) {
                if(window.location.href===url_client+'/account.html' || window.location.href===url_client+'/account') {
                    document.querySelector('input[name="language"]:checked').checked = false;
                    document.getElementById('flex_checkedbox_topyc').checked = res_find.topic;
                    document.querySelector(`#${res_find.language}`).checked = true;
                    if (res_find.profile_img !== '') {
                        document.getElementById('ava_mobile').src = url + "/static/avatar/" + res_find.profile_img;
                        document.getElementById('ava').src = url + "/static/avatar/" + res_find.profile_img;
                    }
                }
            }
            this.language_set(IsAuth,res_find.language);
            this.theme_set(IsAuth,res_find.topic);
        }
    }

    static theme_set = (IsAuth,light_theme=true)=>{
        if(IsAuth){
            const theme_link=document.getElementById("theme-link");
            if(light_theme)theme_link.href="css/light_style.css";
            else theme_link.href="css/dark_style.css";
        }
    }

    static language_set = (IsAuth,lang='rus') => {
        // перевод только страниц где зареган пользователь
        if(IsAuth){
            const rus={
                'close':'Закрыть',
                'main_mobile':'Главная',
                'about_mobile':'О нас',
                'info_mobile':'Доп. инфа',
                'enter_btn_mobile':'Войти',
                'exit_btn_mobile':'Выйти',
                'brand':'Гномы',
                'main':'Главная',
                'about':'О нас',
                'info':'Доп. инфа',
                'enter_btn':'Войти',
                'exit_btn':'Выйти',
                'more_gamburger':'Подробнее',
                'error_account':'Фото более 16 мб или не .png, .jpg',
                'label_ava':'Другая аватарка',
                'change_lang':'Текущий язык',
                'light_theme':'Светлая тема',
                'change_another':'Изменить другое',
                'btn_edit_setting':'Применить',
                'error_account_edit':'Где-то что-то пошло нет так!',
                'change_account':'Изменение аккаунта',
                'btn_account_edit':'Изменить',
                'login_name':'Логин',
                'password':'Пароль',
                'password_again':'Введите пароль повторно',
                'not_found_tittle':'Не такой странички(((',
                'not_found_text':'Перекати теранозавр...',

                'main_h1':'Гномы и хардбас',
                'main_h6':'"Гномы в ритме баса, сила в молотке и музыке нашей души!" \n Цитата: Гном Валентин',
                'info_1_h1':"Бочка бас хрдбасит соло",
                'info_1_h6':"\"Сердце моё бьется в ритме баса, а душа моя наполняется магией музыки. Мы гномы хардбасеры, и наша жизнь – это вечная вечеринка.\" \n Цитата: Гном Тахикардия",
                'info_2_h1':'Гномье зелье',
                'info_2_h6':'"Мы верим в силу звука. Каждая нота – это заклинание, каждый бит – это волшебство. Мы гномы, и наши инструменты – это наши волшебные посохи." \n Цитата: Гном Поэт',
                'info_3_h1':'Кто это?',
                'info_3_p':'    Гномы хардбасеры - это вымышленное сообщество гномов, которые стали символом объединения мира фэнтези и электронной музыки. Они привносят магию и мистику в мир хардбаса, сочетая тяжелые биты и басовые линии с фэнтезийными элементами.\nВ историях и искусстве гномы часто ассоциируются с ремесленными навыками и горными краями. Гномы хардбасеры считаются мастерами не только в ковке металла и создании уникальных орудий, но и в музыкальных искусствах. Они создают басовые ритмы, которые заставляют танцевать всех, кто оказывается в их обители.\n',
                'info_4_h1':'А ещё?',
                'info_4_p':'    Гномы хардбасеры также известны своими музыкальными инструментами, сделанными с большим мастерством. Их барабаны, бас-гитары и синтезаторы могут создавать потрясающие звуки, наполняя мир волшебством и энергией.\nЭто сообщество гномов стоит за девизом "Гномы в ритме баса", и они гордятся своей способностью объединить магию и музыку, создавая уникальное и захватывающее звучание хардбаса.\n',
                'info_5_h1':'Гном Левый',
                'info_6_h1':'Гном Правый',

                'about_h1':'Про гномов и нас',
                'about_h6':'"В горах, среди металла и камня, мы нашли наше призвание. Мы гномы хардбасеры, и наши ритмы разрушают горные вершины."\n Цитата: Гном Кирпич',
                'info_about_1_h1':'Как нас найти?',
                'info_about_1_p':'Эти цитаты отражают гордость и страсть гномов хардбасеров к музыке, а также их умение объединить мир фэнтези с электронными звуками в уникальное и захватывающее искусство.'

            }
            const eng={
                'close':'Close',
                'main_mobile':'Main',
                'about_mobile':'About us',
                'info_mobile':'More info',
                'enter_btn_mobile':'Sign',
                'exit_btn_mobile':'Sign out',
                'brand':'Gnome`s',
                'main':'Main',
                'about':'About us',
                'info':'More info',
                'enter_btn':'Sign',
                'exit_btn':'Sign out',
                'more_gamburger':'More',
                'error_account':'Photos over 16 MB or not .png, .jpg',
                'label_ava':'Another avatar',
                'change_lang':'Language now',
                'light_theme':'Light theme',
                'change_another':'Change another',
                'btn_edit_setting':'Apply',
                'error_account_edit':'Somewhere something went wrong!',
                'change_account':'Change account',
                'btn_account_edit':'Apply',
                'login_name':'Login',
                'password':'Password',
                'password_again':'Password again',
                'not_found_tittle':'Not found page(((',
                'not_found_text':'OMG !_!',

                'main_h1':'Gnomes and hardbass',
                'main_h6':'"The gnomes are in the rhythm of the bass, the power is in the hammer and the music of our soul!" \n Quote: The Dwarf Valentin',
                'info_1_h1':"The bass barrel is playing solo",
                'info_1_h6': "\"My heart beats in the rhythm of the bass, and my soul is filled with the magic of music. We are dwarfs hardbassers, and our life is an eternal party.\"\n Quote: Gnome Tachycardia",
                'info_2_h1':'Dwarf Potion',
                'info_2_h6':'"We believe in the power of sound. Every note is a spell, every bit is magic. We are dwarves, and our tools are our magic staffs."\n Quote: Dwarf Poet',
                'info_3_h1':'Who is this?',
                'info_3_p':' Gnomes Hardbassers are a fictional community of gnomes who have become a symbol of the unification of the world of fantasy and electronic music. They bring magic and mysticism to the world of hard bass, combining heavy beats and bass lines with fantasy elements.In stories and art, dwarves are often associated with craft skills and mountainous regions. Gnomes hardbassers are considered masters not only in forging metal and creating unique tools, but also in the musical arts. They create bass rhythms that make everyone who finds themselves in their abode dance.\n',
                'info_4_h1':'And what else?',
                'info_4_p':' Gnomes hardbassers are also known for their musical instruments made with great skill. Their drums, bass guitars and synthesizers can create amazing sounds, filling the world with magic and energy.The gnome community stands behind the motto "Gnomes in the rhythm of the bass", and they are proud of their ability to combine magic and music, creating a unique and exciting sound of hard bass.\n',
                'info_5_h1':'Gnome Left',
                'info_6_h1':'Gnome Right',

                'about_h1':'About dwarfs and us',
                'about_h6':'"In the mountains, among metal and stone, we found our vocation. We are dwarfs hardbassers, and our rhythms destroy mountain peaks."\n Quote: Dwarf Brick',
                'info_about_1_h1':'How to find us?',
                'info_about_1_p':'These quotes reflect the pride and passion of the dwarf hardbassers for music, as well as their ability to combine the fantasy world with electronic sounds into a unique and exciting art.'
            }

            if(lang==='rus'){
                for(let el in rus){
                    let obj =document.getElementById(el);
                    if(obj){
                        if(obj.placeholder){
                            obj.placeholder=rus[el];
                        }else if(obj.value){
                            obj.value=rus[el];
                        }else{
                            obj.innerText=rus[el];
                        }
                    }
                }
            }
            if(lang==='eng'){
                for(let el in eng){
                    let obj =document.getElementById(el);
                    if(obj) {
                        if (obj.placeholder) {
                            obj.placeholder = eng[el];
                        } else if (obj.value) {
                            obj.value = eng[el];
                        } else {
                            obj.innerText = eng[el];
                        }
                    }
                }
            }

        }
    }


}