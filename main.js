let values = [];
let sorting = false;
let ascending = true;
let algorithm;

function setup() {
  createCanvas(windowWidth - 30, windowHeight - 30);
  frameRate(100); // valor a aumentar ou diminuir para a velocidade da organização
  generateStartingList();
}

function draw() {
  background(255);
  drawList();
  drawControls();
  
  if (sorting && algorithm) {
    algorithm.next();
  }
}

function drawControls() {
  fill(150);
  textSize(18);
  textAlign(LEFT, TOP);
  // text("Press 'R' to reset | Press 'SPACE' to start sorting", 10, 10);
}

function drawList() {
  for (let i = 0; i < values.length; i++) {
    let barColor = (i % 2 === 0) ? color(150, 150, 150) : color(200, 0, 0);
    fill(barColor);
    
    if (sorting) {
      if (algorithm && algorithm.highlightedIndices && algorithm.highlightedIndices.includes(i)) {
        fill(0, 255, 0); // Green for highlighted elements
      }
    }
    rect(i * 20, height - 30, 20, -values[i], 0, 20, 0, 0);
  }
}

function* insertionSort() {
  for (let i = 1; i < values.length; i++) {
    let current = values[i];
    let j = i - 1;

    while (j >= 0 && (values[j] > current && ascending) || (values[j] < current && !ascending)) {
      values[j + 1] = values[j];
      j--;
      yield;
    }

    values[j + 1] = current;
    yield;
  }
  sorting = false;
}

function generateStartingList() {
  values = [];
  for (let i = 0; i < width / 20; i++) {
    values.push(floor(random(height)));
  }
}

function keyPressed() {
  if (keyCode === 32) {
    sorting = true;
    algorithm = insertionSort();
  } else if (key === 'R' || key === 'r') {
    sorting = false;
    generateStartingList();
  }
}
