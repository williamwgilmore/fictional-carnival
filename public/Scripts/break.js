//Drawable area
let canvas = document.getElementById("canvasElement");
let context = canvas.getContext("2d");

//-------------------------Ball section----------------
//Ball starting position
let x = canvas.width/2;
let y = canvas.height-30;
//Ball movement speed and direction
let dx = 2;
let dy = -2;
//Ball size
let ballRadius = 10;
//Collision size
let collisionRadius = 8
//Colors
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'gray', 'black', 'white', 'cyan', 'pink'];
let ballColor = 0; //Starting with red

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = colors[ballColor];
    context.fill();
    context.closePath();
}

function detectCollision() {
    if (y + dy < collisionRadius || y + dy > canvas.height - collisionRadius){
    	dy = -dy;
    	cycleColor();
    }
    if (x + dx < collisionRadius || x + dx > canvas.width - collisionRadius){
    	dx = -dx;
    	cycleColor();
    }
    console.log(ballColor);
}

function cycleColor() {
	ballColor = ballColor == 11 ? 0 : ballColor + 1;
}

//-------------------------Paddle section----------------


//-------------------------Create section----------------
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    detectCollision();
    x += dx;
    y += dy;
}
//Runs every 10 miliseconds
setInterval(draw, 10);