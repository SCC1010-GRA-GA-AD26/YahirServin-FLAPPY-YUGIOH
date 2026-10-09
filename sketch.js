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
  fill(255, 255, 0); 
  text("Último Puntaje: " + puntajeAnterior, 550, 360);
  text("Máximo Puntaje: " + puntajeMaximo, 550, 400);


}






function playing() {
  background(255);
  imageMode(CORNER);
  image(fondoJuego, x, 0);
  image(fondoJuego, x + fondoJuego.width, 0);
  x = x - desX;
  if (x <= -fondoJuego.width) {
    x = 0;
  }

  for (let i = 0; i < wallX.length; i++) {
    imageMode(CENTER);
    
   
    image(pared, wallX[i], wallY[i] - 500, 100, 800); 
    image(pared, wallX[i], wallY[i] + 500, 100, 800); 
    
    wallX[i] = wallX[i] - desX;

    
    if (wallX[i] < -50) {
      wallX[i] = width + 100;
      wallY[i] = random(300, 700); 
    }

    
    if (wallX[i] == posx) {
      puntaje = puntaje + 1;
    }

    
    if (posx + 20 > wallX[i] - 40 && posx - 20 < wallX[i] + 40) {
      
      
      if (posy - 20 < wallY[i] - 100 || posy + 20 > wallY[i] + 100) {
        perderJuego(); 
      }
    }
  } 

  
  velocidadY = velocidadY + gravedad; 
  posy = posy + velocidadY;

 
  if (posy > height - 30 || posy < 30) {
    perderJuego();
  }

  
  imageMode(CENTER);
  image(personaje, posx, posy, 60, 60);

  
  fill(0);
  textSize(50);
  textAlign(CENTER);
  text(puntaje, width / 2, 80);
  textAlign(LEFT); 
}

function mousePressed() {
  if (estadoJuego == 0) {
    estadoJuego = 1;
    x = 0;
    posx = 100;
    posy = height / 2; 
    puntaje = 0;
    puntajeAnterior = puntajeMaximo;
    noCursor();
    
    wallX = [500, 800, 1100];
    wallY = [random(300, 700), random(300, 700), random(300, 700)];
    
    
    velocidadY = -12; 
  } else if (estadoJuego == 1) {
    
    velocidadY = -12; 
  }
}


function perderJuego() {
  estadoJuego = 0; 
  puntajeAnterior = puntaje;
  
  
  if (puntaje > puntajeMaximo) {
    puntajeMaximo = puntaje;
  }
}

