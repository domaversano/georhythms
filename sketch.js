let canvasX = 1200;
let canvasY = 600;
let rows = [];
let cols = [];
let cells = 10; // the x and the y value of cells
let gridDensity = 40; // the higher the number the more compact the grid
let gridSize = 60;
let circleSize = 24;
let radius = 260; // radius of the large shape
let matras = 12; // selects the shape
let textGap = 8.5; /// Gap between numbers
let highlight = 0; /// the shapes' highlight colour
let colourSelect; // selects which shapes to highlight
let cellX;
let cellY;
let numbers = 0;
let numberDist = 1.04;

function setup() {
  createCanvas(canvasX, canvasY);
  cellX = (canvasX - gridDensity * 2) / (cells * 2);
  cellY = (canvasY - gridDensity * 2) / cells;
  for (let i = 0; i < cells; i++) {
    rows[i] = cellX * i;
    cols[i] = cellY * i;
    print(rows[i]);
  }
}

function draw() {
  // Draw grid
  push();
  translate(60, 70);
  background(255, 195, 25, 30);
  numbers = 0;
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      let matra = i * cells + (j + 1);
      push();
      translate(rows[j], cols[i]);
      textSize(9);
      text(matra, -gridSize / 2, -gridSize / 2 + 7);
      rotate(PI * 1.5);

      for (let a = 0; a < matra; a++) {
        if (matra % (a + 1) === 0) {
          beginShape();
          noFill();

          if (a === colourSelect) {
            stroke(highlight);
            strokeWeight(2.5);
          } else {
            stroke(0);
            strokeWeight(1);
          }

          for (let i = 0; i < PI * 2; i += (PI * 2) / (a + 1)) {
            let vx = cos(i) * circleSize;
            let vy = sin(i) * circleSize;
            vertex(vx, vy);
          }
          endShape(CLOSE);
        }
      }
      pop();
    }
  }
  pop();

  // Draws the Large Shape on the right

  textPosition = -305;
  translate(600, 0);
  textSize(10);
  text("Time cycle", 4, 50);
  text(matras, 4, 60.5);
  text("Rhythms ", 4, 548);
  translate(300, 300);
  rotate(PI * 1.5);

  for (let a = 0; a < matras; a++) {
    if (matras % (a + 1) === 0) {
      let division = a + 1;
      push();
      rotate(PI * 0.5);
      textSize(10);
      text(division, textPosition + textGap, 260);
      if (division < 10) {
        textPosition = textPosition + textGap;
      } else {
        textPosition = textPosition + (textGap + 7);
      }
      pop();

      push();
      beginShape();
      noFill();
      if (a === colourSelect) {
        stroke(highlight);
        strokeWeight(2.5);
      } else {
        stroke(0);
        strokeWeight(1);
      }
      for (let i = 0; i < PI * 2; i += (PI * 2) / (a + 1)) {
        x = cos(i) * radius;
        y = sin(i) * radius;
        stroke(0 + a);
        vertex(x, y);
      }
      endShape(CLOSE);
      pop();
    }
  }

  // Draws the black dots on the shape

  push();
  beginShape();

  for (let angle = 0; angle < PI * 2 - 0.01; angle += (PI * 2) / matras) {
    numbers = numbers + 1;
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    strokeWeight(4);
    stroke(40);
    point(x, y);
    strokeWeight(0.1);
    push();
    translate(x * numberDist, y * numberDist);
    rotate(HALF_PI); // 90° clockwise
    textAlign(CENTER, CENTER);
    textSize(8);
    text(numbers, 0, 0);
    pop();
  }
  endShape(CLOSE);
  pop();
}
function mousePressed() {
  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = 60 + rows[j];
      let y = 70 + cols[i];

      let dis = dist(mouseX, mouseY, x, y);

      if (dis < circleSize) {
        matras = i * cells + (j + 1);
      }
    }
  }
}

/// Colour selector that prevents the key creating browser interference

function keyPressed() {

  if (key === "1") colourSelect = 1;
  else if (key === "2") colourSelect = 2;
  else if (key === "3") colourSelect = 3;
  else if (key === "4") colourSelect = 4;
  else if (key === "5") colourSelect = 5;
  else if (key === "6") colourSelect = 6;
  else if (key === "7") colourSelect = 7;
  else if (key === "8") colourSelect = 8;
  else if (key === "9") colourSelect = 9;
  else if (key === "0") colourSelect = 10;

  return false;
}

function keyReleased() {
  colourSelect = 110;
}

