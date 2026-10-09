let  fondoJuego;
let personaje;
let fondoCarga;
let pared;
let wallX=[];
let wallY=[];
let x = 0
let desX = 5
let posx = 100
let posy = 100
let velocidadY = 0; 
let gravedad = 0.8;
let estadoJuego = 0 // 0 = cargando, 1 = jugando
let puntaje = 0;
let puntajeAnterior = 0;
let puntajeMaximo = 0;





function preload() {
  // coloca el código de precarga aquí
  fondoJuego = loadImage("./images/fondojuego1.0.jpg");
  personaje = loadImage("./images/kuri01.gif");
  fondoCarga = loadImage("./images/yugifondo.jpg");
  pared = loadImage("./images/tubo.png");
}

function setup() {
  // coloca el código de configuración aquí
 createCanvas(1000, 980); // crea un lienzo (canvas) de 1000x980 píxeles
}

function draw() {
  // coloca el código de dibujo aquí
  playing();
  if (estadoJuego == 0) {
    inicioGame();
  } 



}

function inicioGame() {
  background(0);
  imageMode(CORNER);
  cursor();
  image(fondoCarga, 0, 0, 720, 980);
  textSize(32);
  fill(255);
  text("Bienvenido al juego", 600, 200);
  text("Haz click para iniciar", 600, 250);
  text("Presiona el mouse para saltar", 550, 300);
  text("Maximo Puntaje: " + puntajeMaximo, 550, 350);


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

  for (let i = 0; i < wallX.length; i++) {
    imageMode(CENTER);
    
    
    
    // Tubo de arriba
    image(pared, wallX[i], wallY[i] - 535, 100, 800); 
    
    // Tubo de abajo
    image(pared, wallX[i], wallY[i] + 535, 100, 800); 
    
    wallX[i] = wallX[i] - desX;

    
    if (wallX[i] < -50) {
      wallX[i] = width + 100;
      
      wallY[i] = random(300, 700); 
    }

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
  if (estadoJuego == 0) {
    estadoJuego = 1;
    x = 0;
    posx = 100;
    posy = 100;
    puntaje = 0;
    puntajeAnterior = puntajeMaximo;
    noCursor();
    wallX = [500, 800, 1100];
    wallY = [random(200, 300), random(400, 600), random(200, 300)];
    velocidadY = -15; // Aplicamos el primer salto al iniciar
  } else if (estadoJuego == 1) {
    velocidadY = -15; // Salto normal mientras se juega
  }
}

