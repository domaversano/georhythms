let matras = 36; // selects the shape
let animateSpeed = 0.01; // Speed the animation goes at
let animatePos = 0; // Position of the animation
let startingMatra = 36;
let canvasX = 1250;
let canvasY = 700;
let rows = [];
let cols = [];
let cellX; // x size of grid shapes
let cellY; // y size of grid shapes

/// Grid

let cells = 10; // number of cells for x and y
let gridDensity = 40; // the HIGHER the number the more compact the grid
let circleSize = 24; // size of the circles on the grid
let gridText = 9; // text size
let gridXpadding = 60; // X padding for Grid
let gridYpadding = 60; // Y padding for Grid
let numberColours = "#D20909";
let rowGap = 1.05;

// Large Georhythm

let animate = 0; /// If animate = 0 then no animation if animate 0 = 1 then animate.
let radius = 280; // radius of the large shape
let textGap = 8.5; /// Gap between numbers
let numberDist = 1.04;
let shapeText = 10;
let geo;
let speed = 0.00333; // Speed of animation // Radius of large shape
let shapeThickness = 1; /// Thickness of the shape's line
let pointSize = 4; /// Thickness of the shape's points
let animationWeight = 6; /// Thickness of the animated points
let rhythms = [];

/// Roll

let divs = [];
let placeX = 10;
let placeY = 690;
let rollX = 1200;
let rollY = 250;
let xPad = 0;
let yPad = 45;
let lineSpacing = 12; // horizontal gap between lines
let lineHeight = 150; // total height of roll
let lineWeight = 0.2;
let polyWeight = 1.4;
let prune = 8;
let xAdj = -20;
let yAdj = 10;

/// Toggle

let toggleSize = 20;
let toggleState = 0;
let toggleX = canvasX - 615;
let toggleY = 52;

function setup() {
  createCanvas(canvasX, canvasY + 200);
  cellX = (canvasX - gridDensity * 2) / (cells * 2);
  cellY = (canvasY - gridDensity * 2) / cells;
  for (let i = 0; i < cells; i++) {
    rows[i] = cellX * i;
    cols[i] = cellY * i * rowGap;
  }

  /// Start with This Georhythm

  for (let m = 0; m < startingMatra; m++) {
    if (matras % (m + 1) === 0) {
      let geo = new Shape(
        m + 1,
        radius,
        speed,
        shapeThickness,
        animationWeight,
        pointSize
      );
      rhythms.push(geo);
    }
  }

  /// Load the first roll

  for (let rhy = 0; rhy < matras; rhy++) {
    if (matras % (rhy + 1) === 0) {
      divs.push(rhy + 1);
    }
  }
}

function draw() {
  /// DRAW GRID

  clear();
  background("#E3E0DD"); /// overall colour
  animatePos = animatePos + speed;
  push();
  translate(gridXpadding, gridYpadding); /// Position of the grid

  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      let matra = i * cells + (j + 1);
      push();
      translate(rows[j], cols[i]);
      textSize(gridText);
      fill(numberColours); /// color of the numbers
      text(matra, -cellX / 2 - 3, -cellY / 2 + 7);
      rotate(PI * 1.5);

      for (let a = 0; a < matra; a++) {
        if (matra % (a + 1) === 0) {
          beginShape();
          noFill();

          for (let ang = 0; ang < PI * 2; ang += (PI * 2) / (a + 1)) {
            let vx = cos(ang) * circleSize;
            let vy = sin(ang) * circleSize;
            vertex(vx, vy);
          }
          endShape(CLOSE);
        }
      }
      pop();
    }
  }
  pop();

  // DRAW LARGE SHAPE

  push();

  translate(canvasX / 1.33333, canvasY / 2);
  textPosition = 672;
  textSize(shapeText);
  fill('#036AC8')
  text("Time cycle", -300, -300);
  text(matras, -250, -300);
  text("Rhythms ", -300, 310);
  rotate(PI * 1.5);

  for (let geo of rhythms) {
    geo.show();

    if (toggleState === 1) {
      geo.animate();
    }
  }

  pop();

  for (let a = 0; a < matras; a++) {
    if (matras % (a + 1) === 0) {
      let division = a + 1;
      push();
      rotate(PI * 2);
      textSize(10); /// CREATE A VARIABLE FOR THIS
      fill('#036AC8');
      text(division, textPosition + textGap, 660);
      if (division < 10) {
        textPosition = textPosition + textGap;
      } else {
        textPosition = textPosition + (textGap + 7);
      }
      pop();
    }
  }

  /// Draw Roll

  let rollPos;

  rollPos = floor(map(animatePos % 1, 0, 1, 0, matras));

  push();
  translate(placeX, placeY);

  textSize(10);
  fill('#036AC8')
  text("Sequence", 17, 9);

  for (let x = 0; x < matras; x++) {
    // Gridlines
    strokeWeight(lineWeight);
    stroke(255, 0, 0);
    line(
      xPad + lineSpacing * x + xPad / 2 - xAdj,
      yPad,
      xPad + lineSpacing * x + xPad / 2 - xAdj,
      yPad + lineHeight
    );
    noStroke();
    fill("#D20909");
    textSize(9);
    text(x + 1, xPad + lineSpacing * x + xPad / 2 - 3 - xAdj, 27);
  }

  for (let a = 0; a < divs.length; a++) {
    for (let b = 0; b < matras / divs[a]; b++) {
      strokeWeight(polyWeight); /// Search

      if (toggleState === 1) {
        if (b * divs[a] === rollPos) {
          stroke("#036AC8");
          strokeWeight(polyWeight * 2);
        } else {
          stroke(0);
          strokeWeight(polyWeight);
        }
      } else {
        stroke(0);
      }

      line(
        xPad + xPad / 2 + lineSpacing * (divs[a] * b) - xAdj,
        yPad + lineHeight - (lineHeight * a) / divs.length,
        xPad + xPad / 2 + lineSpacing * (divs[a] * b) - xAdj,
        yPad + lineHeight - (lineHeight * (a + 1)) / divs.length + prune
      );
    }
  }

  pop();

  /// Toggle

  push();
  translate(toggleX+3, toggleY+2);
  noFill();
  stroke("#036AC8");
  strokeWeight(0.7);
  circle(8.5, 10, 18);
  let frag = toggleSize / 5; /// fragment

  if (toggleState === 0) {
    noStroke();
    fill("#036AC8");
    triangle(frag, frag, frag, frag * 4, frag * 4, toggleSize / 2);
  } else {
    noStroke();
    fill("#036AC8");
    rect((frag * 1.5)-1.5, frag * 1.5, frag * 2, frag * 2);
  }
  pop();
}

function mousePressed() {
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = gridXpadding + rows[j];
      let y = gridYpadding + cols[i];

      let dis = dist(mouseX, mouseY, x, y);

      if (dis < circleSize) {
        matras = i * cells + (j + 1);
      }
    }
  }

  rhythms = [];

  for (let m = 0; m < matras; m++) {
    if (matras % (m + 1) === 0) {
      let geo = new Shape(
        m + 1,
        radius,
        speed,
        shapeThickness,
        animationWeight,
        pointSize
      );
      rhythms.push(geo);
    }
  }

  divs = [];

  for (let rhy = 0; rhy < matras; rhy++) {
    if (matras % (rhy + 1) === 0) {
      divs.push(rhy + 1);
    }
  }

  /// Play/Stop Toggle

  animatePos = 0;

  let tx = toggleX + toggleSize / 2;
  let ty = toggleY + toggleSize / 2;
  let tDist = dist(mouseX, mouseY, tx, ty);

  print(tDist);
  print("hello");

  if (tDist < toggleSize / 2) {
    if (toggleState == 0) {
      toggleState = 1;
    } else {
      toggleState = 0;
    }
  }
}

class Shape {
  constructor(points, radius, speed, shapeWeight, dotWeight, pointWeight) {
    this.p = points;
    this.r = radius;
    this.s = speed;
    this.w = shapeWeight;
    this.d = dotWeight;
    this.pw = pointWeight;
  }

  show() {
    angleMode(RADIANS);
    let sections = TWO_PI / this.p; /// how many degrees in each section

    beginShape();
    noFill();
    for (let z = 0; z < this.p; z++) {
      let x = cos(sections * z) * this.r;
      let y = sin(sections * z) * this.r;

      /// Add shapes and points

      strokeWeight(this.pw);
      point(x, y);
      stroke(0);
      vertex(x, y);
      strokeWeight(this.w);

      /// Add numbers

      push();
      translate(x * 1.04, y * 1.04);
      rotate(PI / 2); // 90° clockwise
      textAlign(CENTER, CENTER);
      strokeWeight(0.7);
      textSize(8);
      if (this.p === matras) {
        noStroke();
        fill("#D20909"); /// Make this not accumulate DARK
        text(z + 1, 0, 0);
      }
      pop();
    }
    endShape(CLOSE);
  }

  animate() {
    let sections = TWO_PI / this.p; /// how many degrees in each section
    let place;

    place = animatePos % 1;

    let stage = floor(place * this.p); /// what stage of the shape
    let stageMove = map(place % (1 / this.p), 0, 1 / this.p, 0, 1); // Is this ok

    let xSec = cos(sections * stage) * this.r;
    let ySec = sin(sections * stage) * this.r;
    let xSec2 = cos(sections * (stage + 1)) * this.r;
    let ySec2 = sin(sections * (stage + 1)) * this.r;

    let xMove = map(stageMove, 0, 1, xSec, xSec2);
    let yMove = map(stageMove, 0, 1, ySec, ySec2);

    if (this.p == 1) {
      stroke("#000000");
    } else {
      stroke("#036AC8");
    }
    strokeWeight(this.d);
    point(xMove, yMove);
  }
}
