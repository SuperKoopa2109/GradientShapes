// Constants
const Y_AXIS = 1;
const X_AXIS = 2;

var balls = [];
var n = 0;
var nMin = 0;
var nMax = 10;

var gridResolution = 5;
var gridResolutionMin = 3;
var gridResolutionMax = 15;
var gridResolutionStep = 1;

var gradientTriangleRes = 255;

var ballSpeed = 0;
var ballRadius = 5;

function setup() {
  createCanvas(600, 600);
	frameRate(60);
  for(let i=0;i<3; i++){
    balls.push(new Ball(round(random(0,width)), round(random(0,height))));
		n++;
  }
  noStroke();
	var gui = createGui('Controls');
	gui.addGlobals( "n", "gridResolution");
	
	sliderRange(1,25,1);
	gui.addGlobals("ballSpeed");
	sliderRange(5,70,1);
	gui.addGlobals("ballRadius");
	sliderRange(10, 1000, 5);
	gui.addGlobals("gradientTriangleRes");
	ellipseMode(CENTER);
}

function draw() {
  background(255);
	if(n > balls.length){
    balls.push(new Ball(round(random(50,width-50)), round(random(50,height-50))));
	}else if(n < balls.length){
		balls.pop();
	}
	
  for(let ball of balls){
		ball.update();
	drawGradientRect();
  }
	
}

function drawGradientRect(){  
	
	// If n == 3 a gradient triangle will be created between points
	if (balls.length == 3) {
		
		// init points
		var A = createVector(balls[0].pos.x, balls[0].pos.y );
		var B = createVector(balls[1].pos.x, balls[1].pos.y );
		var C = createVector(balls[2].pos.x, balls[2].pos.y );

		// compute vectors between points
		var AB = createVector(B.x - A.x, B.y - A.y);
		var AC = createVector(C.x - A.x, C.y - A.y);
		var BC = createVector(C.x - B.x, C.y - B.y);
		
		var det = 0;
		var Area = 0;
		var h = 0;
		

		
		for ( let i = 0; i < gradientTriangleRes; i++ ) {
			
			// compute new points on line between points
			A = createVector(balls[0].pos.x + AC.x * ( i/gradientTriangleRes ), balls[0].pos.y + AC.y * ( i/gradientTriangleRes ) );
			B = createVector(balls[1].pos.x + BC.x * ( i/gradientTriangleRes ), balls[1].pos.y + BC.y * ( i/gradientTriangleRes ) );
			// Point C remains fixed
			C = createVector(balls[2].pos.x, balls[2].pos.y );

/*			// Currently no calculation of height necessary
			// calc determinant
			det = A.x * ( ( B.y * 1 ) - ( C.y * 1 ) ) - A.y * ( ( B.x * 1 ) - ( C.x * 1 ) ) + 1 * ( ( B.x * C.y ) - ( C.x * B.y ) );
			
			// calc area
			Area = 1/2 * det;
			
			// calc height
			h = ( 2 * Area ) / L2_Norm(AC); */
			
			let gradient = drawingContext.createLinearGradient(
				A.x, A.y, B.x, B.y
			);
			
			gradient.addColorStop(0, color(255 * ( 1 - ( i / gradientTriangleRes ) ), 0, 255 * ( i / gradientTriangleRes )));
			gradient.addColorStop(1, color(0, 255 * ( 1 - ( i / gradientTriangleRes ) ), 255 * ( i / gradientTriangleRes )));
			
			drawingContext.strokeStyle = gradient;
			
			line(A.x, A.y, B.x, B.y);
		}
	}
	stroke(0,0,0);
	
}

function L2_Norm(vec){
	return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) );
}


class Ball{
  constructor(x,y){
    this.pos = createVector(x,y);
		let r = random();
		this.speed = createVector(sin(r), cos(r));
    this.col = color(random(0,255), random(0,255), random(0,255));//floor(random(0,255));
  }
	
	update(){
		
		if(this.pos.x-ballRadius <= 0 ||  this.pos.x+ballRadius>=width)
			this.speed.x*=-1;
		
		if(this.pos.y-ballRadius <= 0 ||  this.pos.y+ballRadius>=height)
			this.speed.y*=-1;
		
		this.pos.x = this.pos.x + this.speed.x*ballSpeed;
		this.pos.y = this.pos.y + this.speed.y*ballSpeed;
	}
  
  display(){
    fill(this.col,255,255);
    ellipse(this.pos.x, this.pos.y, ballRadius*2);
  }
	
	
	displayLines(){
		push();
		strokeWeight(20);
		for(let ball of balls){
			if(dist(this.pos.x, this.pos.y, ball.pos.x, ball.pos.y)<1 )continue;
			stroke(this.red, this.green, this.blue);
			line(this.pos.x, this.pos.y, ball.pos.x, ball.pos.y);
			
		}
		pop();
	}
}