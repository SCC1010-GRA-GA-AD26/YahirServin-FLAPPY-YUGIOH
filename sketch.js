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
let estadoJuego = 0;
let puntaje = 0;
let puntajeAnterior = 0;
let puntajeMaximo = 0;
let flashAlpha = 0; 
let anguloPersonaje = 0;
let sonidoSalto;
let sonidoPunto;
let sonidoFinal;










function preload() {
  // coloca el código de precarga aquí
  fondoJuego = loadImage("./images/fondojuego1.0.jpg");
  personaje = loadImage("./images/kuri01.gif");
  fondoCarga = loadImage("./images/yugifondo.jpg");
  pared = loadImage("./images/tubo.png");



  sonidoSalto = loadSound("./sounds/SALTO.mp3");
  sonidoPunto = loadSound("./sounds/PUNTO.mp3");
  sonidoFinal = loadSound("./sounds/FINAL.mp3");
}

function setup() {
  // coloca el código de configuración aquí
 createCanvas(1000, 980); // crea un lienzo (canvas) de 1000x980 píxeles
}

function draw() {
  // coloca el código de dibujo aquí
  if (estadoJuego == 0) {
    inicioGame();
  } else if (estadoJuego == 1) {
    playing();
  } else if (estadoJuego == 2) {
    gameOverScreen(); 
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

function gameOverScreen() {
  
  imageMode(CORNER);
  image(fondoJuego, x, 0);
  image(fondoJuego, x + fondoJuego.width, 0);

  
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  
  textAlign(CENTER);
  fill(255, 50, 50);
  textSize(80);
  text("¡JUEGO TERMINADO!", width / 2, height / 2 - 50);
  
  fill(255);
  textSize(40);
  text("Puntaje Final: " + puntaje, width / 2, height / 2 + 30);
  
  textSize(25);
  fill(255, 255, 0);
  text("Haz click para volver al menú principal", width / 2, height / 2 + 100);
  textAlign(LEFT); 
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

  anguloPersonaje = velocidadY * 0.05;
  anguloPersonaje = constrain(anguloPersonaje, -PI/4, PI/2); 

  push(); 
  translate(posx, posy); 
  rotate(anguloPersonaje); 
  imageMode(CENTER);
  image(personaje, 0, 0, 60, 60); 
  pop(); 

  
  if (flashAlpha > 0) {
    fill(255, 255, 255, flashAlpha);
    rect(0, 0, width, height); 
    flashAlpha = flashAlpha - 10; 
  }

  
  fill(0);
  textSize(50);
  textAlign(CENTER);
  text(puntaje, width / 2, 80);
  textAlign(LEFT);


  }
  
function gameOverScreen() {
  
  imageMode(CORNER);
  image(fondoJuego, x, 0);
  image(fondoJuego, x + fondoJuego.width, 0);

  
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  
  textAlign(CENTER);
  fill(255, 50, 50);
  textSize(80);
  text("¡JUEGO TERMINADO!", width / 2, height / 2 - 50);
  
  fill(255);
  textSize(40);
  text("Puntaje Final: " + puntaje, width / 2, height / 2 + 30);
  
  textSize(25);
  fill(255, 255, 0);
  text("Haz click para volver al menú principal", width / 2, height / 2 + 100);
  textAlign(LEFT); 
}

function perderJuego() {
  if (estadoJuego == 1) { 
    sonidoFinal.play(); 
  }
  estadoJuego = 2; 
  puntajeAnterior = puntaje;
  if (puntaje > puntajeMaximo) {
    puntajeMaximo = puntaje;
  }

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
    
    velocidadY = -10; 
    sonidoSalto.play(); 
    
  } else if (estadoJuego == 1) {
    velocidadY = -10; 
    sonidoSalto.play(); 
    
  } else if (estadoJuego == 2) {
    estadoJuego = 0; 
  }

 }




