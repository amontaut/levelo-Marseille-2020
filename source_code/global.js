class Global{
    constructor(){
        this.timerContainer =document.getElementById("timer");
        this.textTimer = document.getElementsByClassName("resa_en_cours")[0];    
    }

    
    //
    //Clicks du CADRE 1/3 (infos station)
    //
    cadreinfo (){
    //quand click sur bouton RETOUR du cadre infos station ...
        document.querySelectorAll('.fermer_cadre_infos').forEach(e => e.addEventListener('click', event => {
            //...le cadre info disparait
          document.getElementsByClassName('cadre_infos_station')[0].style.display = "none"; 
            //... on remet les marges initiales de 5% autour de la map
            document.getElementById('map').style.marginRight = "5%";
            document.getElementById('map').style.marginLeft = "5%";
            
            //Smooth scrool pour remonter au niveau de la map si on ferme le cadre pour reserver (surtout utile pour mobile) (marche que avec jquery) 
            $('html,body').animate({scrollTop: $(".partiemap").offset().top}, 'slow');
        }));
        
    //quand click sur RESERVER sur cadre infos...
        document.querySelectorAll('.valider_cadre_infos').forEach(e => e.addEventListener('click', event => {
            //... si le nombre de vélo dispo est supérieur ou inferieur à 0 :
            if (sessionStorage.getItem('bikes_dispos_detail') > 0){
                //on peut reserver, le formulaire s'affiche
                document.getElementsByClassName('cadre_infos_station')[0].style.display = "none";
                document.getElementsByClassName('formulaire_resa')[0].style.display = "block"; 
            } else {
                //on ne peut pas reserver, le formulaire s'affiche pas 
                document.getElementsByClassName('formulaire_resa')[0].style.display = "none"; 
            }
        })); 
    } 
    
    
    
    //
    //Clicks du CADRE 2/3 (formulaire)
    //
    cadreform(){
        
         //Quand on click sur bouton RETOUR dans cadre formulaire nom prenom...
        document.querySelectorAll('.fermer_form').forEach(e => e.addEventListener('click', event => {
            //...fermer le forumlaire
            document.getElementsByClassName('formulaire_resa')[0].style.display = "none"; 
            //...re afficher le cadre avec infos sur la station
            document.getElementsByClassName('cadre_infos_station')[0].style.display = "block";
            //...marges de la map à 2%
            document.getElementById('map').style.marginRight = "2%";
            document.getElementById('map').style.marginLeft = "2%";
        }));   
        
        let htmlprenom = document.getElementById('prenom');
        let htmlnom = document.getElementById('nom');
        
        //Si le visiteur a déjà rentré un nom et prénom lors d'une precedente visite, alors ils s'affichent dans le form
        if (localStorage.getItem('prenom') != null && localStorage.getItem('nom') != null){
                //Regex permettant d'enlever les caractère spéciaux (accents non compris) dans input form et enlever les espaces en trop
                htmlprenom.value = localStorage.getItem('prenom').replace(/[`!@#$%&^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '').trim();
                htmlnom.value = localStorage.getItem('nom').replace(/[`!@#$%&^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '').trim();
            
                //Si le nom et prénom sont changés, alors on refait la procédure "classique"
                //Quand on click sur VALIDER après le form ...
                document.querySelectorAll('.valider_form').forEach(e => e.addEventListener('click', event => {
                //Si prénom manquant OU si que des espaces dans le champs...
                if (htmlprenom.value === 'undefined' || htmlprenom.value == "" || htmlprenom.value.trim() == ""){ 
                    alert("Veuillez renseigner un prenom");

                //Si nom manquant OU si que des espaces dans le champs...
                } else if (htmlnom.value === 'undefined' || htmlnom.value == "" || htmlnom.value.trim() == ""){
                    alert("Veuillez renseigner un nom");

                //Si tout est OK
                } else {
                    //Regex permettant d'enlever les caractère spéciaux (accents non compris) dans input form
                    htmlprenom.value = htmlprenom.value.replace(/[`!@#$%&^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '');
                    htmlnom.value = htmlnom.value.replace(/[`!@#$%&^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '');
                    //stockage du nom et prenom
                    localStorage.setItem('prenom', htmlprenom.value);
                    localStorage.setItem('nom', htmlnom.value);

                    //Les noms et prénoms sont rentrés dans le cadre resa en cours
                    document.querySelectorAll('.prenom_output')[0].innerHTML = (localStorage.getItem('prenom'));
                    document.querySelectorAll('.nom_output')[0].innerHTML = (localStorage.getItem('nom'));

                    //Le form disparait
                    document.getElementsByClassName('formulaire_resa')[0].style.display = "none"; 
                    //Le cadre canvas apparait
                    document.getElementsByClassName('cadre_canvas')[0].style.display = "block"; 
                }
            }));
        //Si aucun nom et prénom n'a été rentré, alors procédure "classique"
        } else {
        //Quand on click sur VALIDER après le form ...
        document.querySelectorAll('.valider_form').forEach(e => e.addEventListener('click', event => {
                //Si prénom manquant OU si que des espaces dans le champs...
                if (htmlprenom.value === 'undefined' || htmlprenom.value == "" || htmlprenom.value.trim() == ""){ 
                    alert("Veuillez renseigner un prenom");

                //Si nom manquant OU si que des espaces dans le champs...
                } else if (htmlnom.value === 'undefined' || htmlnom.value == "" || htmlnom.value.trim() == ""){
                    alert("Veuillez renseigner un nom");

                //Si tout est OK
                } else {
                    //Regex permettant d'enlever les caractère spéciaux (accents non compris) dans input form
                    htmlprenom.value = htmlprenom.value.replace(/[`!@#$%&^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '');
                    htmlnom.value = htmlnom.value.replace(/[`!@#$%&^*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '');
                    //stockage du nom et prenom
                    localStorage.setItem('prenom', htmlprenom.value);
                    localStorage.setItem('nom', htmlnom.value);

                    //Les noms et prénoms sont rentrés dans le cadre resa en cours
                    document.querySelectorAll('.prenom_output')[0].innerHTML = (localStorage.getItem('prenom'));
                    document.querySelectorAll('.nom_output')[0].innerHTML = (localStorage.getItem('nom'));

                    //Le form disparait
                    document.getElementsByClassName('formulaire_resa')[0].style.display = "none"; 
                    //Le cadre canvas apparait
                    document.getElementsByClassName('cadre_canvas')[0].style.display = "block"; 
                }
            }));
        }
        
        //Le nom et prénom s'affichent au rechargement dans le cadre RESA en cours s'il y en a une
        document.querySelectorAll('.prenom_output')[0].innerHTML = (localStorage.getItem('prenom'));
        document.querySelectorAll('.nom_output')[0].innerHTML = (localStorage.getItem('nom'));
        //Le nom de la station s'affiche dans le cadre resa en cours au rechargement de la page
        document.getElementsByClassName('nom_station_output')[0].innerHTML= localStorage.getItem('nom_station_detail');
    }
    
    
    
    
    //
    //Clicks du CADRE 3/3 (canvas)
    //
    cadreCanvas () {
        
        
        //Quand on click sur RETOUR après le canvas...
        document.querySelectorAll('.fermer_canvas').forEach(e => e.addEventListener('click', event => {
            //...fermer le canvas
            document.getElementsByClassName('cadre_canvas')[0].style.display = "none"; 
            //...re afficher le cadre formulaire
            document.getElementsByClassName('formulaire_resa')[0].style.display = "block";
         }))
    }
    
    
    
    //
    //Cadre Resa en cours
    //
    refresh(){
    //Affichage du cadre resa en cours au rechargement + timer continue
          if(sessionStorage.dateExpiration){
            let dateExpiration = Number(sessionStorage.dateExpiration);
            let time = dateExpiration - Date.now();
            this.timer = new Timer(time);
            this.textTimer.style.display = "block";
        }
    }
    
    endTimeEvent(){
        //Quand le timer expire...
        document.addEventListener('endTimeEvent', () => {
            sessionStorage.clear();
            this.textTimer.style.display = "none";
            document.getElementById("expired").style.display = "block";
        })
        
        //au click sur annuler dans le cadre resa en cours...
         document.querySelectorAll('.tout_annuler').forEach(e => e.addEventListener('click', event => {
            sessionStorage.clear();
            this.textTimer.style.display = "none";
            document.getElementById("message_annule").style.display = "block";
         }))
    }
}


