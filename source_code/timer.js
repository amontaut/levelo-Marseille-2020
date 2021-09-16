class Timer{
    constructor(ms=1200000){
        this.time = ms/1000;      
        this.minTimer = document.getElementById("min");
        this.secTimer = document.getElementById("sec");
        this.minTimer.textContent = this.minute;  
        this.secTimer.textContent = this.second;
        this.endTimeEvent = new Event('endTimeEvent', {bubbles:true});
        this.init();
    }
    
    init(){
        this.calcMinutes();       
        this.calcSeconds();
        this.startDecrease();
        this.SiResaEnCours();
    }
   
    startDecrease(stop){ 
    let chrono = setInterval(() =>{
        this.interval = chrono;
        this.time--; 
        if(this.time > 0){         
            this.calcMinutes();     
            this.calcSeconds();
            //affichage des minutes et secondes dans le html
            this.minTimer.textContent = this.minute;       
            this.secTimer.textContent = this.second;
        }else{
            this.stop()     
            }
        }, 1000);
    }
    
    stop(){
        clearInterval(this.interval);
        document.dispatchEvent(this.endTimeEvent);  
        this.second = 0;
        this.secTimer.textContent = this.second;
        this.minute = 0;
        this.minTimer.textContent = this.minute;
    }
    
    calcMinutes(){
        this.minute =Math.floor(this.time/60);
    }
    
    calcSeconds(){
        this.second = Math.floor(this.time-(this.minute*60));
    }
    
    SiResaEnCours (stop) {
        // Quand on click sur TOUT ANNULER dans le cadre resa en cours, timer =0
        document.querySelectorAll('.tout_annuler').forEach(e => e.addEventListener('click', event => {
            //(on déclanche la méthode stop)
            this.stop();
            //(le cadre expiré ne s'affiche pas )
            document.getElementById('expired').style.display = "none";
            
    }))
        // Quand on click sur RESERVER dans le cadre infos station...
        document.querySelectorAll('.valider_cadre_infos').forEach(e => e.addEventListener('click', event => {
            //Si le timer != 0...
            if (this.second != 0 || this.minute != 0){
                //On ne peut pas relancer une reservation, msg d'alerte + le formulaire ne s'affiche pas
                 alert("Vous avez deja une reservation en cours. Vous pouvez faire une nouvelle reservation en annulant la precedente");
                document.getElementsByClassName('formulaire_resa')[0].style.display = "none";
                document.getElementsByClassName('resa_en_cours')[0].style.display = "block";
            }
        }));
    }
} 
