function preload() {
  // coloca el código de precarga aquí
  fondoJuego = loadImage("./images/videogame-scenary-with-mountains-and-flowers.jpg");
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
  image(fondoJuego, 0, 0);
}