//Drawable area
let canvas = document.getElementById("canvasElement");
let context = canvas.getContext("2d");

//Colors - used by ball and paddle
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'gray', 'black', 'white', 'cyan', 'pink'];

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
//Starting with red
let ballColor = 0; 

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = colors[ballColor];
    context.fill();
    context.closePath();
}

function cycleColor() {
	ballColor = ballColor == 11 ? 0 : ballColor + 1;
	paddleColor = paddleColor == 11 ? 0 : paddleColor + 1;
}

function detectCollision() {
    if (y + dy < collisionRadius){
    	dy = -dy;
    	cycleColor();
    }
    if (x > paddleX && x < paddleWidth + paddleX && y < paddleY + 5 && y > paddleY - 5){
    	dy = -dy;
    }
    if (y + dy > canvas.height - collisionRadius){
    	document.location.reload();
    }
    if (x + dx < collisionRadius || x + dx > canvas.width - collisionRadius){
    	dx = -dx;
    	cycleColor();
    }
}

//-------------------------Paddle section----------------
//Paddle Size
let paddleHeight = 10;
let paddleWidth = 75;
//Starting position
let paddleY = canvas.height;
let paddleX = (canvas.width-paddleWidth)/2;
//Color
let paddleColor = 10; //Starting with cyan
//Movement variables
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

//Listen for key presses
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//Key pressed
function keyDownHandler(e){
	if (e.keyCode == 39 || e.keyCode == 68){
		rightPressed = true;
	}
	if (e.keyCode == 37 || e.keyCode == 65){
		leftPressed = true;
	}
	if (e.keyCode == 38 || e.keyCode == 87){
		upPressed = true;
	}
	if (e.keyCode == 40 || e.keyCode == 83){
		downPressed = true;
	}
}

//Key released
function keyUpHandler(e){
	if (e.keyCode == 39 || e.keyCode == 68){
		rightPressed = false;
	}
	if (e.keyCode == 37 || e.keyCode == 65){
		leftPressed = false;
	}
	if (e.keyCode == 38 || e.keyCode == 87){
		upPressed = false;
	}
	if (e.keyCode == 40 || e.keyCode == 83){
		downPressed = false;
	}
}

//Mouse commands
// document.addEventListener("mousemove", mouseMoveHandler, false);

// function mouseMoveHandler(e){
// 	let mouseX = e.clientX - canvas.brickOffsetLeft;
// 	if (mouseX > 0 && mouseX < canvas.width){
// 		paddleX = mouseX - paddleWidth/2;
// 	}
// }

    function mouse(e) {
      var pos = getMousePos(canvas, e)
      paddleX = pos.x - paddleWidth/2
    }

    window.addEventListener('mousemove', mouse, false)

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect()
      return {
        x: evt.clientX - rect.left
      }
    }

//Render the paddle
function drawPaddle(){
	//Movement
	if (rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 5;
	}
	if (leftPressed && paddleX > 0){
		paddleX -= 5;
	}
	if (upPressed && paddleY > 0){
		paddleY -= 5;
	}
	if (downPressed && paddleY < canvas.height){
		paddleY += 5;
	}
	//Render
	context.beginPath();
	context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	context.fillStyle = colors[paddleColor];
	context.fill();
	context.closePath();
}

//-------------------------Brick section----------------
let brickRowCount = 3;
let brickColumCount = 7;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 25;
let brickOffsetLeft = 25;

let bricks = [];
for (let c=0; c<brickColumCount; c++){
	bricks[c] = [];
	for (let r=0; r<brickRowCount; r++){
		bricks[c][r] = {x: 0, y: 0, status: 1};
	}
}

function drawBricks() {
	for (let c=0; c<brickColumCount; c++){
		for (let r=0; r<brickRowCount; r++){
			if (bricks[c][r].status == 1){
				let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
				let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				context.beginPath();
				context.rect(brickX,brickY,brickWidth, brickHeight);
				context.fillStyle = 'maroon';
				context.fill();
				context.closePath();
			}
		}
	}
}

function detectBrickCollision() {
	for (let c=0; c<brickColumCount; c++){
		for (let r=0; r<brickRowCount; r++){
			let b = bricks[c][r];
			if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && b.status == 1){
				dy = -dy;
				b.status = 0;
				score ++;
			}
		}
	}
}

//score
let score = 0;

function drawScore() {
	context.font = '16px Arial';
	context.fillStyle = 'blue';
	context.fillText('Score: ' + score, 8,20);
}

//-------------------------Draw renders the game using the above functions----------------
function draw() {
	//Clear the current positions
    context.clearRect(0, 0, canvas.width, canvas.height);
    //move the ball
    x += dx;
    y += dy;
    //Redraw the new positions
    detectBrickCollision();
    detectCollision();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    if (score == 21){
		context.font = '50px Arial';
		context.fillStyle = 'blue';
		context.fillText('You win!', canvas.width/2 - 90,canvas.height/2);
		clearInterval(game);
	}
}

//Runs every 10 miliseconds
let game = 	setInterval(draw, 10);