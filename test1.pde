float offset = 0;
boolean drawPattern = true;

void setup() {
  size(800, 600);
  background(255);
}

void draw() {
  if (drawPattern) {
    background(255);
    translate(0, height / 2); // Move origin to middle of the screen
    for (int x = 0; x < width; x += 50) { // Increase spacing for clearer wave patterns
      float y = sin((x + offset) * 0.02) * 100; // Slower motion, adjust 0.02 for speed
      drawCoral(x, y, 30); // Adjust size for desired appearance
    }
    offset += 0.5; // Smaller increment for slower animation
  }
}

void drawCoral(float x, float y, float size) {
  pushMatrix();
  translate(x, y);
  noFill();
  stroke(0);
  beginShape();
  for (float angle = 0; angle < TWO_PI; angle += 0.1) {
    float rad = size + sin(angle * 3) * size / 3; // Sinuous wave shape
    float sx = cos(angle) * rad;
    float sy = sin(angle) * rad;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  popMatrix();
}

void keyPressed() {
  if (key == ' ') {
    drawPattern = !drawPattern; // Toggle pattern drawing with space bar
  }
}
