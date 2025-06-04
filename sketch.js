/*
 * "I SEE YOU" project is inspired from the concept  
 * "We are the universe experiencing itself" - Alan Watts
 * Everytime you run the system, you will get a message from the universe to you, and you will have a chance to watch your emotions, you thoughts dancing with the universe.
 * You are the meditator.
 * For every mouse movement or click, you are able to see the connection between you and the whole universe.
 * 
 * My ChakraParticle, ChakraSystem, LightEffectSystem, LightParticle, Star,
 * StarPath classes are inspired from the particle and particle system classes from
 * Patt Vira: https://www.youtube.com/watch?v=QlpadcXok8U&t=917s
 * The coding train: https://www.youtube.com/watch?v=syR0klfncCk&t=333s
 * I modified and played with the effects to make it suitable for showing
 * connections between us and the universe
 * 
 * I modified the galaxy logic from Understanding the Universe Through Code
 * https://www.youtube.com/watch?v=F-3Mt5avI2o
 * to simulate the milky way.
 */

// This is the meditator drawing part
let wide = 90; // Wide of the bottom
let tall = 20; // Tall of the bottom
let meditatorHeight;
let meditator = [];

// Store the lights we generate when clicking the mouse 
let myLights = [];
// Animation effect for every click
let animations = ["spreading", "hugging", "connecting"]

// Chakra system from crown to root and cursor
let chakraColors;
let chakras = [];
let chakraSize = 7;
let mindfulCursor;

/* Simulate milky way - The Spiral Galaxy
  A central bulge is a spherical or oval-shaped structure found at the center of the galaxy
*/
let centralBulgeLen = 20;  // center of galaxy
let ellipticalRatio = 0.7; // wide and tall ratio of ellipse
let starDistance = 1.4; // distance between stars
let galaxySize = 800; // number of paths

// Elliptical system of the galaxy
let starPaths = [];
let rotationScale; // constant scale to rotate every frame
let rotOffset;

// Text display part
let myLogo;
let myText;
let randMessage = [1, 2, 3, 4, 5, 6];

// Sound part
let mySound;
let started = false; // used to start the sound when mouse is clicked

function preload() {
  // Picking message file
  let myFile = `message${random(randMessage)}.txt`;
  myText = loadStrings(myFile);
  myLogo = loadStrings("logo.txt");
  mySound = loadSound('You_Heal_Me.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // SET UP GALAXY
  rotationScale = 360 / galaxySize;
  rotOffset = 360 / galaxySize;
  setUpGalaxy();

  // SET UP US MEDITATING AND OUR CHAKRAS
  setUpMyself();
  setUpChakra();

  // TEXT DISPLAYED
  textFont("Quicksand");
  textSize(12);

  // CURSOR
  noCursor();
  mindfulCursor = new ChakraSystem(mouseX, mouseY, "MINDFULLNESS", color("white"));
}


function draw() {
  drawBackground();
  drawMyself();

  // TEXT DISPLAYED
  let alpha = 200 + 55 * sin(frameCount * 2);
  textAlign(CENTER, TOP);
  for (let i = 0; i < myText.length; i++) {
    fill(255, 255, 255, alpha);
    text(myText[i], width / 2, 40 + i * 20); // Display each line of text
  }

  textAlign(LEFT, TOP);
  for (let i = 0; i < myLogo.length; i++) {
    fill(255, 255, 255, alpha);
    text(myLogo[i], 20, height - 200 + i * 15); // Display each line of text
  }

  // Translate origins to draw galaxy
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < galaxySize; i++) {
    // Draw path
    starPaths[i].show();
    starPaths[i].update();
  }
  pop();

  // Draw chakra
  for (let i = 0; i < chakras.length; i++) {
    chakras[i].emit();
    chakras[i].update();
    chakras[i].show();
  }

  // Draw mindful cursor, representing our mindfulness
  mindfulCursor.x = mouseX;
  mindfulCursor.y = mouseY;
  mindfulCursor.emit();
  mindfulCursor.update();
  mindfulCursor.show();

  // Draw and update the light effects we generate
  for (let i = myLights.length - 1; i > 0; i--) {
    myLights[i].update();
    myLights[i].show();
    if (myLights[i].isFinished()) {
      myLights.splice(i, 1);
    }
  }

  // Changing the spiral direction with mouse movement
  dancing();
}

// This function represents the spiral dancing with regards to our mouse positions by changing the rotating scale
function dancing() {
  rotOffset = map(mouseX + mouseY, 0, width + height, -400 / galaxySize, 400 / galaxySize);
}

/* 
 * OUR ACTIONS TO CONNECT WITH THE UNIVERSE
 */
function mousePressed() {
  // First press is to start the music
  if (!started) {
    mySound.play();
    mySound.setVolume(0.5);
    started = true;
  }

  // When mouse is pressed, the light system will generate a connecting effect randomly between us and universe
  // Each effect is linked to a chakra of our body 
  myLights.push(new LightEffectSystem(mouseX, mouseY, random(chakras), random(animations)));
}

/*
 * DRAW GALAXY BACKGROUND
 */
function drawBackground() {
  for (let i = 0; i < height; i++) {

    // noise() is used to make it smoothly dark change
    let noiseScale = noise(frameCount * 0.01);

    // Purple tone
    let blueValue = map(i, 0, height, 50, 200 * noiseScale);
    let redValue = map(i, 0, height, 0, 50 * noiseScale);

    stroke(noiseScale * 50, 10, blueValue);
    line(0, i, width, i);

  }
}

/*
 * SET UP THE SPIRAL LOGIC 
 */
function setUpGalaxy() {
  for (let i = 0; i < galaxySize; i++) {
    // Using the ellipticalRatio to create elliptical movement of stars around the center
    let w = centralBulgeLen + i * starDistance;
    let h = w * ellipticalRatio;
    //Add up a constant rotation angle to make create spiral effect
    starPaths.push(new StarPath(w, h, rotationScale += rotOffset));
  }
}

/*
 * SETUP MEDITATOR 
 */
function setUpMyself() {
  // Draw bottom
  for (let i = -80; i < 80; i++) {
    // coordinateAngle is used in different speeds to draw the bottom shape
    coordinateAngle = i;
    let xSpeed = 2;
    let ySpeed = 3;
    let x = sin(coordinateAngle * xSpeed) * wide;
    let y = cos(coordinateAngle * ySpeed) * tall;

    meditator.push(new Dot(x, y));
    coordinateAngle++;
  }

  // Draw body
  let bodyLeft = meditator[0];
  let bodyRight = meditator[meditator.length - 1];
  let bodyWide = wide / 6;
  let bodyTall = tall * 2;
  for (let i = 0; i > -160; i--) {
    let x = sin(i) * bodyWide + bodyLeft.x;
    let y = cos(i) * bodyTall + bodyLeft.y - bodyTall;
    // unshift is used to set the start of the next left part to be drawn
    meditator.unshift(new Dot(x, y));

    x = sin(map(i, 0, -160, -40, -120)) * bodyWide - bodyRight.x / 2;
    y = cos(map(i, 0, -160, -10, -120)) * bodyTall + bodyLeft.y - bodyTall;
    // left arm
    meditator.push(new Dot(x, y));

    x = sin(map(i, 0, -160, 0, 20)) * bodyWide + bodyRight.x;
    y = cos(map(i, 0, -160, -10, 100)) * bodyTall + bodyRight.y - bodyTall;
    // right arm
    meditator.push(new Dot(x, y));

    x = sin(map(i, 0, -160, 10, 160)) * bodyWide + bodyRight.x;
    y = cos(map(i, 0, -160, 10, 160)) * bodyTall + bodyRight.y - bodyTall;
    // push is used to set the start of the next right part to be drawn
    meditator.push(new Dot(x, y));
  }

  // Draw neck
  let neckLeft = meditator[0];
  let neckRight = meditator[meditator.length - 1];
  let neckWide = wide / 3;
  let neckTall = wide / 3;
  for (let i = 0; i < 90; i++) {
    let x = sin(i) * neckWide + neckLeft.x;
    let y = cos(i) * neckTall + neckLeft.y - neckTall;
    // left neck
    meditator.unshift(new Dot(x, y));

    x = sin(map(i, -180, -90, 90, 180)) * neckWide + neckRight.x;
    y = cos(map(i, -180, -90, 90, 180)) * neckTall + neckRight.y - neckTall;
    // right neck
    meditator.push(new Dot(x, y));
  }

  // Draw head
  let headStartPoint = meditator[0];
  let headWide = 20;
  let headTall = 25;
  for (let i = 10; i < 335; i++) {
    let x = sin(i) * headWide + headStartPoint.x + headWide / 2;
    let y = cos(i) * headTall + headStartPoint.y - headTall;
    meditator.push(new Dot(x, y));
  }

  // Define our height to locate 7 Chakras
  meditatorHeight = tall + bodyTall + headTall * 2 + neckTall * 2;
}

/*
 * CLASS DOT TO DRAW MEDITATOR
 */
class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Draw meditator with blinking effect
  drawDot() {
    noStroke();
    fill(255, 255, 200);
    circle(this.x + random(-2, 2), this.y + random(-2, 2), random(2));
  }
}

/*
 * DRAW MEDITATOR 
 */
function drawMyself() {
  push();
  translate(width / 2, height - 80);
  // Style the circle using shadows.
  for (let i = 0; i < meditator.length; i++) {
    meditator[i].drawDot();
  }
  pop();
}

/*
 * SETUP CHAKRAS 
 */
function setUpChakra() {

  chakraColors = [
    color("rgb(250,75,250)"),
    color("rgb(168,91,224)"),
    color("rgb(123,123,243)"),
    color("rgb(138,243,138)"),
    color("rgb(243,243,144)"),
    color("rgb(255,204,111)"),
    color("rgb(231,69,69)")
  ];

  let chakraNames = [
    "MIND",
    "EYES",
    "THROAT",
    "HEART",
    "STOMACH",
    "BACK",
    "LEGS"
  ];

  // CHAKRAS position are set relating to the meditator's height and positions
  for (let i = 0; i < chakraSize; i++) {
    let y = map(i, 0, 6, height - 80 - meditatorHeight, height - 80);
    chakras.push(new ChakraSystem(width / 2 + 4, y, chakraNames[i], chakraColors[i]));
  }
}

/*
 * RESIZE CANVAS WHEN NEEDED
 */
function windowResized() {
  let oldWidth = width;
  resizeCanvas(windowWidth, windowHeight);

  // Resize text
  if (windowWidth < 400) {
    textSize(10);
  } else {
    textSize(12);
  }

  // Resize chakras' positions
  for (let i = 0; i < chakraSize; i++) {
    let y = map(i, 0, 6, height - 80 - meditatorHeight, height - 80);
    chakras[i].x = width / 2 + 4;
    chakras[i].y = y;
  }

  // Resize the size of the universe
  if (oldWidth < width) {
    starDistance = map(oldWidth, 0, width, 1.4, 2);
  } else {
    starDistance = map(oldWidth, 0, width, 2, 1.4);
  }
  for (let i = 0; i < galaxySize; i++) {
    // Using the ellipticalRatio to create elliptical movement of stars around the center
    let w = centralBulgeLen + i * starDistance;
    let h = w * ellipticalRatio;
    //Add up a constant rotation angle to make create spiral effect
    starPaths[i].wide = w;
    starPaths[i].height = h;
  }
}