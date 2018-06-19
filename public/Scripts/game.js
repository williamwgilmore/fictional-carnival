let CanvasArea = {
	canvas: null,
	context: null,
	create: function(canvas_id){
		this.canvas = document.getElementById(canvas_id);
		this.context = this.canvas.getContext('2d');
		return this.context;
	}
}

var Sprite = function(filename, is_pattern){
	//Construct
	this.image = null; //this attaches the property to Sprite
	this.pattern = null;
	this.To_Radians = Math.PI/180;

	if (filename != undefined && filename != "" && filename != null){
		this.image = new Image();
		this.image.src = filename;

		if (is_pattern){
			this.pattern = CanvasArea.context.createPattern(this.image, 'repeat');
		}
	}
	else
	{
		console.log('Unable to load sprite' + filename);
	}

	this.draw = function(x,y,w,h){
		//Pattern?
		if (this.pattern != null){
			CanvasArea.context.fillStyle = this.pattern;
			CanvasArea.context.fillRect(x,y,w,h);
		} else {
			if (w != undefined || h != undefined)
			{
				CanvasArea.context.drawImage(this.image, x, y, this.image.width, this.image.height);
			} else {
				//stretch
				CanvasArea.context.drawImage(this.image, x, y, this.image, x, y, w, h);
			}
		}
	};

	this.rotate = function(x,y,angle){
		CanvasArea.context.save();
		CanvasArea.context.translate(x,y);
		CanvasArea.context.rotate(angle * this.To_Radians);
		CanvasArea.context.drawImage(this.image, -(this.image.width/2), -(this.image.width/2));
		CanvasArea.context.restore();
	}
};

$(function() {
	CanvasArea.create('canvasElement');

	CanvasArea.context;

	let spaceBackground = "../Images/background.png";

	let image = new Sprite(spaceBackground, true);

	setInterval(function(){
		CanvasArea.context.fillStyle = '#000000';
		CanvasArea.context.fillRect(0,0,800,800);

		image.draw(160,160, 256, 180);
	})

	// CanvasArea.context.beginPath();
	// CanvasArea.context.rect(0,0, 640, 480);
	// CanvasArea.context.fillStyle = 'black';
	// CanvasArea.context.fill();


});