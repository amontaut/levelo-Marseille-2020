class Canvas {
	constructor() {
        this.timerContainer = document.getElementById("timer");
        this.textTimer = document.getElementsByClassName("resa_en_cours")[0]; 
		this.canvas = $('#canvas');
		this.ctx = this.canvas[0].getContext("2d");
		this.topCanvas = this.canvas[0].getBoundingClientRect().top; // pixels par rapport au haut de la page
		this.leftCanvas = this.canvas[0].getBoundingClientRect().left; // pixels par rapport au coin gauche de la page
		this.x = this.leftCanvas; // position initiale = left 0 du canvas
		this.y = this.topCanvas; // position initiale = top 0 du canvas
		this.x2 = 0;
		this.y2 = 0; // deuxièmes coordonnées
		this.canvasFilled = false;
		this.clear = $('.effacer_canvas');
		this.submit = $('.valider_canvas');
		this.click = function (e) { // crée une fonction stable qui permet au OFF de marcher
					e.preventDefault(); // permet de ne pas déclencher d'événement de souris si c'est en mode digital
					this.ctx.strokeStyle = 'black'; //couleur du trait
					this.ctx.lineWidth = 2; //taille du trait
					this.ctx.lineJoin = 'round';
					this.ctx.lineCap = 'round';
					this.ctx.beginPath();
					this.ctx.moveTo(this.x, this.y);
					this.ctx.lineTo(this.x2, this.y2);
					this.ctx.closePath();
					this.ctx.stroke();
					this.canvasFilled = true; // le canvas est rempli
		};
		this.draw = this.click.bind(this); // crée une nouvelle fonction attachée à la classe (this sera toujours la classe)
		this.MouseTouch(); // lance les premières propriétés + events
        this.documentHeight = $(document).height();
		this.ClickValide();
	};

	MouseTouch() {
		this.canvas.on('mousedown', (e) => { // clic
			this.canvas.on('mousemove', this.draw);
		});

		this.canvas.on('mouseup', (e) => { // clic relevé
			this.canvas.off('mousemove', this.draw);
		});

		this.canvas.on('mouseleave', (e) => { // la souris quitte le périmètre du Canvas
			this.canvas.off('mousemove', this.draw);
		});

		this.canvas.on('mousemove', (e) => { // la souris bouge sur le Canvas
			this.topCanvas = this.canvas[0].getBoundingClientRect().top;
			this.leftCanvas = this.canvas[0].getBoundingClientRect().left;
			this.x2 = this.x;
			this.y2 = this.y;
			this.x = e.clientX - this.leftCanvas; // coordonnées sur le viewport - leftCanvas
			this.y = e.clientY - this.topCanvas;
		});
        
        //Pour écrans tactiles
		this.canvas.on('touchstart', (e) => {
			e.preventDefault();
			this.topCanvas = this.canvas[0].getBoundingClientRect().top;
			this.leftCanvas = this.canvas[0].getBoundingClientRect().left;
			this.x = e.touches[0].clientX - this.leftCanvas; // coordonnées sur le viewport - leftCanvas
			this.y = e.touches[0].clientY - this.topCanvas;
			this.canvas.on('touchmove', this.draw);
		});

		this.canvas.on('touchend', (e) => {
			e.preventDefault();
			this.canvas.off('touchmove', this.draw);
		});

		this.canvas.on('touchleave', (e) => {
			e.preventDefault();
			this.canvas.off('touchmove', this.draw);
		});

		this.canvas.on('touchmove', (e) => {
			e.preventDefault();
			this.x2 = this.x;
			this.y2 = this.y;
			this.x = e.touches[0].clientX - this.leftCanvas; // coordonnées sur le viewport - leftCanvas
			this.y = e.touches[0].clientY - this.topCanvas;
		});
	};
    
    ClickValide() {
            this.clear.click((e) => {
			this.ctx.clearRect(0, 0, this.canvas.width(), this.canvas.height());
			this.canvasFilled = false;
		});

        //Quand on click sur VALIDER après le canvas...
		this.submit.click((e) => { 
			e.preventDefault();
			if (!this.canvasFilled) { // si le canvas n'est pas rempli...
				alert("Veuillez signer dans le cadre prevu a cet effet svp");
                document.getElementsByClassName('resa_en_cours')[0].style.display = "none"; 
                
			} else { // si le canvas est rempli
                //start du timer
                this.timer = new Timer(1200000);
                this.expiration = Date.now() + (this.timer.time*1000);
                
                //affichage du cadre resa en cours
                if(this.textTimer.style.display === "none"){ 
                    this.textTimer.style.display = "block";
                }
                
                //affichage ou non du cadre expired
                if(document.getElementById("expired").style.display === "block"){
                    document.getElementById("expired").style.display = "none";
                }

               //affichage ou non du cadre annulé
                if(document.getElementById("message_annule").style.display === "block"){
                    document.getElementById("message_annule").style.display = "none";
                }
                
                //stockage du timer
                sessionStorage.setItem("dateExpiration", this.expiration);
                this.timerContainer.style.display = "block";

                //...Le cadre pour le canvas disparait
                document.getElementsByClassName('cadre_canvas')[0].style.display = "none";
                //...Le cadre resa en cours apparait
                document.getElementsByClassName('resa_en_cours')[0].style.display = "block";


               //Le nom de la station s'affiche dans le cadre resa en cours
               document.getElementsByClassName('nom_station_output')[0].innerHTML= document.getElementsByClassName('detail_nom_station')[0].innerHTML;
            };
        })
    }
    
};