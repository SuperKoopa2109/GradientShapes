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

var ballSpeed = 0;
var ballRadius = 5;

function setup() {
  createCanvas(600, 600);
	//colorMode(HSB);
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
    //ball.display();
	drawGradientRect();
	//ball.displayLines();
  }
	//drawGradientBackground();
	
}

function radialGradient(sX, sY, sR, eX, eY, colorS, colorE){
	let gradient = drawingContext.createRadialGradient(
	sX, sY, sR, eX, eY
	);
}

function drawGradientRect(){  
	c1 = color(255, 0, 0);
	c2 = color(0, 255, 0);
	//setGradient(c1, c2);
	//drawingContext.createRadialGradient();
	//setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
	//fill(255, 204, 0);
	describe('yellow rect with black outline in center of canvas');
	//rect(20, 20, 60, 60);
	//ellipse(200, 200, 50);
	
	if (balls.length == 3) {

		//for ( let i = 0; i < 255; i++ ){
				
		//}
		
		//stroke(255,0,0);
		//line(10,10,100,100);
		var A = createVector(balls[0].pos.x, balls[0].pos.y );
		var B = createVector(balls[1].pos.x, balls[1].pos.y );
		var C = createVector(balls[2].pos.x, balls[2].pos.y );
		
		var AB = createVector(B.x - A.x, B.y - A.y);
		var AC = createVector(C.x - A.x, C.y - A.y);
		var BC = createVector(C.x - B.x, C.y - B.y);
		
		var det = 0;
		var Area = 0;
		var h = 0;
		

		
		for ( let i = 0; i < 255; i++ ) {
			
			A = createVector(balls[0].pos.x + AC.x * ( i/255 ), balls[0].pos.y + AC.y * ( i/255 ) ); //createVector(0,0);
			B = createVector(balls[1].pos.x + BC.x * ( i/255 ), balls[1].pos.y + BC.y * ( i/255 ) );//createVector(0,-5);
			C = createVector(balls[2].pos.x, balls[2].pos.y );//createVector(8,0);
			
			// calc vectors
			//AB = createVector(balls[0].pos.x - balls[1].pos.x, balls[0].pos.y - balls[1].pos.y);
			//AC = createVector(balls[0].pos.x - balls[2].pos.x, balls[0].pos.y - balls[2].pos.y);
			//BC = createVector(balls[1].pos.x - balls[2].pos.x, balls[1].pos.y - balls[2].pos.y);

			
			// calc determinant
			det = A.x * ( ( B.y * 1 ) - ( C.y * 1 ) ) - A.y * ( ( B.x * 1 ) - ( C.x * 1 ) ) + 1 * ( ( B.x * C.y ) - ( C.x * B.y ) );
			
			// calc area
			Area = 1/2 * det;
			
			// calc height
			h = ( 2 * Area ) / L2_Norm(AC);
			
			//strokeWeight(20);
			//stroke(255,0,0);
			//console.log([A.x, A.y, B.x, B.y]);
			
			let gradient = drawingContext.createLinearGradient(
				A.x, A.y, B.x, B.y
			);
			
			gradient.addColorStop(0, color(255 * ( 1 - ( i / 255 ) ), 0, i));
			gradient.addColorStop(1, color(0, 255 * ( 1 - ( i / 255 ) ), i));
			
			drawingContext.strokeStyle = gradient;
			
			line(A.x, A.y, B.x, B.y);
			fill(255, 0, 0);
		}
	}
	stroke(0,0,0);
	
	
	/* d_x = round(balls[0].pos.x - balls[1].pos.x);
	strokeWeight(5);
	//line(30, 20, 85, 20);
	//stroke(0,255,0);
	//line(50,50, 1000, 1000);
	//line(round(balls[0].pos.x), round(balls[0].pos.y), round(balls[1].pos.x), round(balls[1].pos.y));
	for ( i = balls[0].pos.x; i < balls[1].pos.x; i++ ){
		stroke(255,0,0);
		//line(
	}
	//console.log(balls.length);
	//console.log(round(balls[0].pos.x - balls[1].pos.x));
	for (let ball of balls) {
		//ball.pos.x 
		for( let x = 0; x<100; x+=1){
			fill(x,22,22);
		}
	} */
}

function L2_Norm(vec){
	return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2) );
}

/* function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
} */

function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawGradientBackground(){
	let index = 0;
	let sum ;
	for(let y=0;y<height;y+=gridResolution){
		for(let x=0;x<width;x+=gridResolution){
			sum = 0;
			for(let ball of balls){
				let d = dist(x,y,ball.pos.x, ball.pos.y);
				let col = 400*ballRadius/d;
				sum+=col;
			}
			fill(sum,255,255);
			rect(x,y,gridResolution, gridResolution);
		}
	}
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