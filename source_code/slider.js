class Slider {
	constructor() {
		this.prev_btn = document.getElementById("prev");
		this.next_btn = document.getElementById("next");
		this.pause = document.getElementById("pause");
		this.play = document.getElementById("play");
		this.images = document.querySelectorAll(".img_slider");
		this.bulles = document.querySelectorAll(".points");
		this.slideAuto = null;
		this.imageActuelle = 0;
		this.vitesse = 5000;
	};
    
    //Appelé quand changement d'img
	reset() {
		for (let i = 0; i < this.images.length; i++) {
			this.images[i].classList.add("invisible");
			this.bulles[i].style.backgroundColor = "#F0D7C0";
		};
		if (this.imageActuelle == this.images.length) {
			this.imageActuelle = 0;
		};
		if (this.imageActuelle == -1) {
			this.imageActuelle = this.images.length - 1;
		};
		this.affichage();
	};

    //Affichage slide et points
	affichage() {
		this.images[this.imageActuelle].classList.remove("invisible");
		this.bulles[this.imageActuelle].style.backgroundColor = "#A64422";
	};

	nextSlide() { // Pour next slide
		this.imageActuelle++;
		this.reset();
	};

	prevSlide() { // Pour prev slide
		this.imageActuelle--;
		this.reset();
	};

	
    detectTouche (event){ // Pour changement quand flèches droite et gauche du clavier
        if (event.which == 39){
            this.nextSlide(); //next
        } else if (event.which == 37){
            this.prevSlide(); //prev
        }
    }

	playSlide() { // Pour le bouton play
		this.play.classList.add("invisible");
		this.pause.classList.remove("invisible");
		this.slideAuto = setInterval(this.nextSlide.bind(this), this.vitesse);
	};

	pauseSlide() { // Pour le bouton pause
		this.pause.classList.add("invisible");
		this.play.classList.remove("invisible");
		clearInterval(this.slideAuto);
	};

	initControles() { 
        //au click sur fleche next
		this.next_btn.addEventListener("click", this.nextSlide.bind(this)); 
        //au click sur fleche prev
		this.prev_btn.addEventListener("click", this.prevSlide.bind(this));
        //au click sur btn play
		this.play.addEventListener("click", this.playSlide.bind(this));
        //au click sur btn pause
		this.pause.addEventListener("click", this.pauseSlide.bind(this));
        //Pour les touches clavier
		document.addEventListener("keydown", this.detectTouche.bind(this));
        //pour play auto
		this.slideAuto = setInterval(this.nextSlide.bind(this), this.vitesse);
	};
};