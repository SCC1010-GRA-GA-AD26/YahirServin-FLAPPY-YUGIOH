let  fondoJuego;
let personaje;
let x = 0
let desX = 5
let posx = 100
let posy = 100
let velocidadY = 0; 
let gravedad = 0.8;





function preload() {
  // coloca el código de precarga aquí
  fondoJuego = loadImage("./images/fondojuego1.0.jpg");
  personaje = loadImage("./images/kuri01.gif");
}

function setup() {
  // coloca el código de configuración aquí
 createCanvas(1000, 980); // crea un lienzo (canvas) de 1000x980 píxeles
}

function draw() {
  // coloca el código de dibujo aquí
  playing();
  
}

function playing(){

  background(255);
  imageMode(CORNER);
  image(fondoJuego, x, 0);
  image(fondoJuego, x + fondoJuego.width, 0);
  x = x - desX;
  if (x <= -fondoJuego.width) {
    x = 0
  }

  velocidadY = velocidadY + gravedad; 
  
  
  posy = posy + velocidadY;

  
  if (posy > height - 60) {
    posy = height - 60; 
    velocidadY = 0;     
  }

  
  if (posy < 0) {
    posy = 0;
    velocidadY = 0;
  }

  image(personaje, posx, posy, 60, 60);
}

function mousePressed() {
 
  velocidadY = -15;
}