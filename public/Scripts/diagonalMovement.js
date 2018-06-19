const canvas = document.getElementById('canvasElement');
const context = canvas.getContext('2d');

context.beginPath();
context.rect(20,40,50,50);
context.strokeStyle  = "rgba(0, 0, 255, 0.5)";
context.stroke();
context.fillStyle = 'yellow';
context.fill();
context.closePath();

var x = canvas.width;
var y = canvas.height;

function draw() {
	context.clearRect(0,0,canvas.width, canvas.height);
	context.beginPath();
	context.arc(x,y,20,0,Math.PI*2,false);
	context.fillStyle = 'green';
	context.fill();
	context.closePath();
}

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
	let xMovement = 0;
	let yMovement = 0;
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    if (map[37]){
    	xMovement -= 2;
    }
    if (map[39]){
    	xMovement += 2;
    }
    if (map[38]){
    	yMovement -= 2;
    }
    if (map[40]){
    	yMovement += 2;
    }
    x += xMovement;
    y += yMovement;
    draw();
}