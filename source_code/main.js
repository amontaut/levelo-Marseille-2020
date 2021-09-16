class Appli { 
    
    init() { 
        //
        //SLIDER
        //
        
        let slider = new Slider;
        slider.initControles();
        
        //
        //CANVAS
        //
        let canvas = new Canvas ();        

        //
        //GLOBAL
        //
        let gobal = new Global();
        gobal.cadreinfo();
        gobal.cadreform();
        gobal.cadreCanvas();
        gobal.endTimeEvent();
        gobal.refresh();
        
        //
        //MAP
        //
        let map = new Map (
            null, 
            ""
        )
        map.ajaxGet();
        map.initMap();
    }
} 


var appli = new Appli(); 

window.onload = function () { 
    appli.init() //Initialisation/déclanchement de la fonction au chargement de la page 
}; 
