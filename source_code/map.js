class Map {
  constructor(macarte, myIcon) {
    this.macarte = macarte; //= null
    this.myIcon = myIcon;//= ""
    
  }
    
    initMap(){
        // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
        var lat = 43.284235; //lat et lon du point par defaut qui va centrer la carte
        var lon = 5.371954; 
        var stations = "";
        var marker = "";
        
        this.macarte = L.map('map').setView([lat, lon], 14); //Le chiffre correspond au zoom par default sur la carte
        
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' , {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="https://wiki.openstreetmap.org/wiki/Tiles#Servers</a>/textTimerODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 30
        }).addTo(this.macarte); 
    }
    
    MarkeretResa(station){
        var stationModel = { // création de l'objet station pour pouvoir afficher les infos facilement après dans le cadre d'information
            init: function (name, address, positionlat, positionlng, banking, status, bikestands, availableBS, availableB, lastupdate) {
                this.name = name;
                this.address = address;
                this.position = {
                    lat: positionlat,
                    lng: positionlng
                };
                this.banking = banking;
                this.status = status;
                this.bike_stands = bikestands;
                this.available_bike_stands = availableBS;
                this.available_bikes = availableB;
                this.last_update = lastupdate;
            }
        };
        
        //Changement de l'img des markers. Vert si vélos dispos, rouge si pas de velo dispos, marron si places pas dispo
        if (station.available_bikes <= 0){
            this.myIcon = L.icon({
                iconUrl: "../img/pin_rouge.png",
                iconSize: [35, 35],
            })
         } else if (station.available_bike_stands <= 0) {
            this.myIcon = L.icon({
                iconUrl: "../img/pin_marron.png",
                iconSize: [35, 35],
            })
         } else {
            this.myIcon = L.icon({
                iconUrl: "../img/pin_vert.png",
                iconSize: [35, 35],
            })
        }
        
        //Affichage des markers à chq point de lon et lat (avec img definie ci-dessus)
        var marker = L.marker([(station.position.lat), (station.position.lng)], { icon: this.myIcon }).addTo(this.macarte);
        
        //Regex pour enlever les chiffres au debut de certains noms de station
        let nom_stations = (station.name);
        var nouvelleChaine = nom_stations.replace(/\-?\d+./, '');
        
        //Quand on click sur un marker, le nom de la station s'affiche au dessus du marker
        marker.bindPopup(nouvelleChaine);
                
        //au click sur MARKER 
        marker.addEventListener("click",function(){
            
            // ... le cadre 1/3 infos station s'affiche
            document.getElementsByClassName('cadre_infos_station')[0].style.display = "block";
            //... la marge sur les bords de la carte passe de 5% à 2% car 5% ca fait trop
            document.getElementById('map').style.marginRight = "2%";
            document.getElementById('map').style.marginLeft = "2%";
             
            //Si on click sur un marker alors que le form ou le canvas est déjà affiché, alors le form ou le canvas se ferme pour laisser apparaitre le cadre infos station de la station cliquée
            document.getElementsByClassName('formulaire_resa')[0].style.display = "none";
            document.getElementsByClassName('cadre_canvas')[0].style.display = "none";
            
            //... le nom de la station s'affiche dans le cadre infos station
            document.getElementsByClassName('detail_nom_station')[0].innerHTML= (nouvelleChaine);
           //au click sur tout valider on stock le nom de la station pour l'afficher dans le cadre resa en cours
            document.querySelectorAll('.valider_canvas').forEach(e => e.addEventListener('click', event => {
                localStorage.setItem('nom_station_detail', nouvelleChaine);
            }))
             
            //... l'adresse s'affiche dans le cadre infos station
            document.getElementsByClassName('detail_adresse_station')[0].innerHTML= (station.address);
             
           //... le nombre de velo dispo s'affiche :
            //SI il y a une resa en cours à la station sur laquelle on a cliqué...
            if (document.getElementsByClassName("resa_en_cours")[0].style.display == "block" && document.getElementsByClassName("detail_nom_station")[0].innerHTML == document.getElementsByClassName("nom_station_output")[0].innerHTML ){
               //... ALORS 1 vélo en moins à la station concernée si une resa en cours 
                sessionStorage.setItem("velo_dispo_si_resaencours", (station.available_bikes) - 1);
                document.getElementsByClassName('detail_velos_dispo_station')[0].innerHTML= (sessionStorage.getItem("velo_dispo_si_resaencours"));
            //SI pas de resa en cours ...
            } else {
                //...ALORS le nombre de velo s'affiche normalement
                document.getElementsByClassName('detail_velos_dispo_station')[0].innerHTML= (station.available_bikes);
            }
            
            //le nb de place dispos à une borne s'affiche
            document.getElementsByClassName('detail_places_dispo_station')[0].innerHTML= (station.available_bike_stands);
            
            //La avec possibilité de payer par CB ou non s'affiche
            if (station.banking == true) { 
                document.getElementsByClassName('cb_station')[0].innerHTML= ("Possibilit&eacute;e de payer par carte bleue");
            } else {
                ("Pas de terminal carte bleue. L'acc&egrave;s aux v&eacute;los est possible uniquement si vous possedez une carte RTM")
            }
            
             //L'info station opérationnelle ou non s'affiche
            if (station.status == "OPEN") { 
                document.getElementsByClassName('statut_station')[0].innerHTML= ("La station fonctionne correctement");
            } else {
                ("Cette station ne fonctionne pas pour le moment. Nous nous excusons pour la gène occasionnée")
            }
            
            //On stock le nombre de vélo dispo pour ensuite afficher ou non le bouton reserver OU reservation impossible
            sessionStorage.setItem('bikes_dispos_detail', station.available_bikes);
            
            //... si le nombre de vélo dispo est supérieur ou inferieur à 0 :
            if (document.getElementsByClassName('detail_velos_dispo_station')[0].innerHTML > 0){
               //txt on peut reserver un vélo
                document.getElementsByClassName("valider_cadre_infos")[0].innerHTML = "R&eacute;server un v&eacute;lo";
               //pointer cursor 
                document.getElementsByClassName("valider_cadre_infos")[0].style.cursor = "pointer";
            } else {
               //txt on ne peut pas reserver de vélo
                document.getElementsByClassName("valider_cadre_infos")[0].innerHTML = "Aucun v&eacute;lo diponible. R&eacute;servation impossible";
               //pointer not allowed 
                document.getElementsByClassName("valider_cadre_infos")[0].style.cursor = "not-allowed";
            }  
    
            //Smooth scrool jusqu'au cadre pour reserver quand clic sur le marker (surtout utile pour mobile) (marche que avec jquery) 
            $('html,body').animate({scrollTop: $(".cadre_infos_station").offset().top}, 'slow');       
         });
    }
    
    //On recupère les infos sur les stations
    ajaxGet(MarkeretResa) {
        var requestURL = 'https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=***';
        //Depuis l'API JC DECAUX
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        var _this = this;
        request.onload = function () {
          var stations = request.response;
          for (var i = 0; i < stations.length; i++) {
            _this.MarkeretResa(stations[i]);
          }
        }
        request.send();
    }
}



    
