//An den Variablen eigentlich nicht mehr rumdrehen. Gibt jetzt ne GUI
var sradius;
var radius = 220;
var sabstand;
var abstand = 80
var slänge;
var länge = 100;
var sbreite;
var breite = 40;
var sgeschwindigkeit;
var geschwindigkeit = 30;
var sanzStrahle;
var anzStrahle = 8;
var füllung; 
var resetg;
var temp = 0;
var mode=1;
var strioff=0;
var sopa;
var capture;
var recording = false;
var c;
var gif;

function setup() { 
  
  c = createCanvas(windowWidth, windowHeight-4); //Größe der Bildfläche. Standard Auflösung: 1050,760px
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  setupGif();
  this.menuw = width-290+20; //Menü konfi width
  //Buttons
  resetg = createButton('Reset');
  resetg.position(menuw+200,400);
  resetg.mousePressed(Reset);
  angleMode(DEGREES); //Danke Gott für diese function!!!
  //Slider
  sradius = createSlider(0,500,220,1); //Radius Slider
  sradius.position(menuw, 50);
  sradius.style('width', '250px');
  sanzStrahle = createSlider(1,15,8,1); //Anzahl der Strahle Slider std. 8
  sanzStrahle.position(menuw, 120);
  sanzStrahle.style('width', '250px');
  sbreite = createSlider(0.5,90,40,0.5); //Breite Slider
  sbreite.position(menuw, 190);
  sbreite.style('width', '250px');
  slänge = createSlider(0,250,100,0.5); //Länge der Striche Slider
  slänge.position(menuw, 260);
  slänge.style('width', '250px');
  sabstand = createSlider(0.5,500,80,0.5); //Abstand zwischen Strahlen und Kern Slider
  sabstand.position(menuw, 330);
  sabstand.style('width', '250px');
  sgeschwindigkeit = createSlider(0,600,30,1); //Geschwindigkeits Slider std. 30
  sgeschwindigkeit.position(menuw, 400);
  sgeschwindigkeit.style('width', '190px');
  strioff = createSlider(0,90,0,1); //Dreieck Offset std. 5?
  strioff.position(menuw, 590);
  strioff.style('width', '250px');
  sopa = createSlider(0,255,255,1); //Opacity 2.0
  sopa.position(menuw, 520);
  sopa.style('width', '250px');
  //Radio Buttons
  füllung = createRadio();
  füllung.option('Gefüllt ',1);
  füllung.option('Leer ',0);
  füllung.position(menuw, 450);
  füllung.style('width', '150px');
  
  
  
  
} 

function draw() { 
  
  //Hier werden die alten Variablen den neuen Slidern/Buttons zugewiesen..
  radius = sradius.value();
  anzStrahle = sanzStrahle.value();
  breite = sbreite.value();
  länge = slänge.value();
  abstand = sabstand.value();
  geschwindigkeit = sgeschwindigkeit.value();
  //Lets Draw!!
  background(255);
  image(capture, 0, 0, 320, 240);

  if (recording && frameCount % 3 == 0) {
    gif.addFrame(c.elt, {delay: 1, copy: true});
  }
	this.i=0;
  temp += geschwindigkeit*0.005;
  //Rotation in a nutshell.. literally
  push();
  this.farbe = color(226,0,116,int(sopa.value())); //<-Farbeinstellung, magenta ist (226,0,116), schwarz ist (0)
  stroke(this.farbe);
  strokeWeight(breite);
  translate((width-310+20)/2,height/2);
  füllung.value()==true?fill(this.farbe):noFill();
  arc(0, 0, radius, radius, PI*1.6, PI*1.5999); //Das ist der Kreis
  
  rotate(temp);
  for(i=0;i < anzStrahle;i++) {
    rotate(360/anzStrahle);
    if(mode==0){
    line(0,-radius/2-abstand,0,-radius/2-abstand-länge); //So werden die Linien generiert
  }
    if(mode==1){
      //strokeWeight(3);
      
      line(-strioff.value(),-radius/2-abstand,0,-radius/2-abstand-länge);
      line(strioff.value(),-radius/2-abstand,0,-radius/2-abstand-länge);
      line(strioff.value(),-radius/2-abstand,-strioff.value(),-radius/2-abstand);
    }
  
  
  
  
  
  
  }
  pop();
  //End of nutshell
  strokeWeight(3);
  line(menuw-20,20,menuw-20,height-20);
  //Hier wird der Menütext gezeichnet
  
  textSize(16);
  text('Radius:',menuw,40);
  text(nfc(int(sradius.value())),menuw+60,40);
  text('Anzahl der Strahle:',menuw,110);
  text(nfc(int(sanzStrahle.value())),menuw+150,110);
  text('Stiftstärke:',menuw,180);
  text(nfc(int(sbreite.value())),menuw+85,180);
  text('Länge der Strahlen:',menuw,250);
  text(nfc(int(slänge.value())),menuw+150,250);
  text('Abstand:',menuw,320);
  text(nfc(int(sabstand.value())),menuw+70,320);
  text('Geschwindigkeit:',menuw,390);
  text(nfc(int(sgeschwindigkeit.value())),menuw+130,390);
  text('Deckkraft:',menuw,510);
  text(nfc(int(sopa.value())),menuw+80,510);
  text('Dreieck Offset:',menuw,580);
  text(nfc(int(strioff.value())),menuw+110,580);
  
}

function Reset(){
  temp=0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-4);
}
  
function mousePressed() {
  recording = !recording;
  if (!recording) {
    gif.render();
  }
}

function setupGif() {
  gif = new GIF({
    workers: 2,
    quality: 40
  });

  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}
