let particles = [];
let interactionData = [];
let growthFactor = 1.05;  // Growth rate for exponential increase in particles

function setup() {
  createCanvas(800, 600);
  // Initial spawn of a small particle
  particles.push(new Particle(width / 4, height / 2, color(255, 204, 0), 5));
}

function draw() {
  background(255);

  // Update and display particles
  for (let particle of particles) {
    particle.update();
    particle.connectToOthers(particles);
    particle.show();
  }

  // Exponential particle multiplication
  if (frameCount % 60 == 0) { // Every second
    let currentCount = particles.length;
    for (let i = 0; i < currentCount * (growthFactor - 1); i++) {
      let p = new Particle(random(width / 2), random(height), color(255, 204, 0), 5);
      particles.push(p);
    }
  }

  // Gradual color change to resemble molding
  for (let particle of particles) {
    let r = red(particle.col);
    let g = green(particle.col);
    let b = blue(particle.col);
    particle.col = color(r * 0.99, g * 0.99, b + 0.1);
  }

  // Update interaction data
  interactionData.push({time: frameCount, count: particles.length});
  if (interactionData.length > 50) {
    interactionData.shift();
  }

  // Draw data chart
  drawDataChart();
}

function drawDataChart() {
  // Draw line chart and scatter plot
  push();
  translate(width * 2 / 3, 0);
  let plotWidth = width / 3;
  let plotHeight = height / 3;

  // Axes
  stroke(0);
  line(20, plotHeight - 20, plotWidth - 20, plotHeight - 20); // X-axis
  line(20, plotHeight - 20, 20, 20); // Y-axis

  // Labels
  textSize(12);
  text("Time", plotWidth - 30, plotHeight - 5);
  text("Growth", 5, 15);

  // Scatter plot
  noFill();
  for (let i = 0; i < interactionData.length; i++) {
    let x = map(i, 0, interactionData.length - 1, 25, plotWidth - 25);
    let y = map(interactionData[i].count, 0, max(interactionData.map(d => d.count)), plotHeight - 25, 25);
    ellipse(x, y, 5, 5); // scatter plot
  }
  pop();
}

class Particle {
  constructor(x, y, col, size) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.size = size;
    this.connected = [];
    this.sizeOscillation = 0;
  }

  update() {
    // Oscillating size
    this.sizeOscillation += 0.1;
    this.size = 5 + sin(this.sizeOscillation) * 2;
  }

  show() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);

    // Draw connections
    stroke(this.col);
    for (let other of this.connected) {
      if (other !== this) {
        line(this.x, this.y, other.x, other.y);
      }
    }
  }

  connectToOthers(particles) {
    this.connected = particles.filter(p => dist(this.x, this.y, p.x, p.y) < 50);
  }
}
