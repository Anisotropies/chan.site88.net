var canvasBg = document.getElementById('canvasBg');
var ctxBg =  canvasBg.getContext('2d');
var canvasDrone = document.getElementById('canvasDrone');
var ctxDrone =  canvasDrone.getContext('2d');
var canvasShip = document.getElementById('canvasShip');
var ctxShip =  canvasShip.getContext('2d');

var drone1 = new Drone();
var ships = [];
var ship1 =  new Ship();
var canvasWidth = canvasBg.width;
var canvasHeight = canvasBg.height;
var requestAnimationFrame = window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.msRequestAnimationFrame ||
							window.oRequestAnimationFrame;
var isPlaying = false;	
var spriteSheet = new Image();
spriteSheet.src ="images/spritesheet.png";
spriteSheet.addEventListener('load', init, false);





//main functions
function init() {
	makeShips(3);
	drawBg();
	startDrawing();	
	document.addEventListener('keydown',checkKeyDown,false);
    document.addEventListener('keyup',checkKeyUp,false);
}

function makeShips(num) {
	for(var i = 0; i < num; i++)
		ships[ships.length] = new Ship();
}

function drawShips() {
	clearCtxShip(); //Very interesting see *around line 159 for place I originally put it. It made the other ships disappear.
	for(var i = 0; i < ships.length; i++)
		ships[i].drawShip();
}

function loop() {
	if(isPlaying) {
		drone1.drawDrone();
		drawShips();
		requestAnimationFrame(loop);
	}
}

function startDrawing() {
	isPlaying = true;
	loop();
}

function stopDrawing() {
	isPlaying = false;
}

function drawBg() {
	var srcX = 0;
	var srcY = 0;
	var drawX = 0; 
	var drawY = 0;
	ctxBg.drawImage(spriteSheet,srcX,srcY,canvasWidth,canvasHeight,drawX,drawY,canvasWidth,canvasHeight);
}

function clearCtxBg(){
	ctxBg.clearRect(0,0,canvasWidth, canvasHeight);
} 

//end main functions



//Drone functions
function Drone() {
	this.srcX = 0;
	this.srcY = 400;
	this.drawX = 350; 
	this.drawY = 200;
	this.width = 100;
	this.height = 100; 
	this.speed = 5;
    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
	this.isSpacebar = false;
	this.isShooting = false;
	this.keyLastPressed = ""; //marker of what key was pressed, so that the program knows what direction to draw the ship
	this.bullets = [];
	this.currentBullet = 0;
	this.numBullets = 25;
	this.noseX = this.drawX + 100;
	this.noseY = this.drawY + 50;
	for(var i = 0; i < this.numBullets; i++)
		this.bullets[this.bullets.length] = new Bullet();
}

Drone.prototype.drawDrone = function () {
    clearCtxDrone();
    this.checkKeys();
	if(this.drawX > 650) 
		this.drawX = -50;
	if(this.drawX < -50) 
		this.drawX = 650;
	if(this.drawY < -50) 
		this.drawY = 350;
	if(this.drawY > 350) 
		this.drawY = -50;
	
	if(this.keyLastPressed === "down")
		this.srcY = 700;
	else if(this.keyLastPressed === "left")
		this.srcY = 500;
	else if(this.keyLastPressed === "up")
		this.srcY = 600;
	else 
		this.srcY = 400;
	this.noseX = this.drawX + 100;
	this.noseY = this.drawY + 50;
	this.checkShooting();
	this.drawAllBullets();
	ctxDrone.drawImage(spriteSheet,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};

Drone.prototype.checkKeys = function () { 
    if (this.isUpKey) {
        this.drawY -= this.speed;
    }
    if (this.isRightKey) {
        this.drawX += this.speed;
    }
    if (this.isDownKey) {
        this.drawY += this.speed;
    }
    if (this.isLeftKey) {
        this.drawX -= this.speed;
    }
};

function clearCtxDrone() {
    ctxDrone.clearRect(0,0,canvasWidth,canvasHeight);
}

Drone.prototype.drawAllBullets = function(){
	for(var i = 0; i < this.bullets.length; i++){
		if(this.bullets[i].drawX >= 0)
			this.bullets[i].drawBullet();
		if(this.bullets[i].explosion.hasHit)
			this.bullets[i].explosion.drawExplosion();
			console.log("Width: " + this.bullets[i].explosion.width);
			console.log("Height: " + this.bullets[i].explosion.height);
	}
};

Drone.prototype.checkShooting = function() {
	if(this.isSpacebar && !this.isShooting){
		this.isShooting = true;
		this.bullets[this.currentBullet].fire(this.noseX, this.noseY);
		this.currentBullet++;
		if(this.currentBullet >= this.bullets.length)
			this.currentBullet = 0;
	} else if(!this.isSpacebar){
		this.isShooting = false;
	}
};
//End Drone functions























//Begin Bullet functions
function Bullet() {
	this.srcX = 250;
	this.srcY = 400;
	this.drawX = -20;
	this.drawY = 0;
	this.width = 5;
	this.height = 5;
	this.speed = 3;
	this.explosion = new Explosion(); 
}
Bullet.prototype.drawBullet = function() {
	this.drawX += this.speed;
	ctxDrone.drawImage(spriteSheet,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
	this.checkHitShip();
	if(this.drawX > canvasWidth)
		this.recycle();
};

Bullet.prototype.fire = function(startX, startY) {
	this.drawX = startX;
	this.drawY = startY;
};

Bullet.prototype.checkHitShip = function() {
	for(var i = 0; i < ships.length; i++){
		if(	this.drawX >= ships[i].drawX &&
			this.drawX <= ships[i].drawX + ships[i].width &&
			this.drawY >= ships[i].drawY &&
			this.drawY <= ships[i].drawY + ships[i].width){
				this.explosion.drawX = ships[i].drawX + (ships[i].width / 2) - this.explosion.width/2;
				this.explosion.drawY = ships[i].drawY + (ships[i].height / 2) - this.explosion.height/2;
				this.explosion.hasHit = true;
				this.recycle();
				ships[i].recycle();
		}
	}
};

Bullet.prototype.recycle = function() {
	this.drawX = -20;
};
//End Bullet functions

//Begin Explosion functions
function Explosion() {
	this.srcX = 255;
	this.srcY = 400;
	this.drawX = 550;
	this.drawY = 200;
	this.width = 25;
	this.height = 25;
	this.hasHit = false;
	this.currentFrame = 0;
	this.totalFrames = 10;
}

Explosion.prototype.drawExplosion = function() {
	//if(this.currentFrame < this.totalFrames){
	//	ctxDrone.drawImage(spriteSheet,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
	//	this.currentFrame++;
	//}
	if(this.currentFrame < 3){
		ctxDrone.drawImage(spriteSheet,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
		this.currentFrame++;
	}
	else if(this.currentFrame < 6){
		this.srcX = 280;
		this.srcY = 400;
		this.width = 50;
		this.height = 50;
		ctxDrone.drawImage(spriteSheet,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
		this.currentFrame++;
	}
	else if(this.currentFrame < 9) {
		this.srcX = 330;
		this.srcY = 400;
		this.width = 100;
		this.height = 100;
		ctxDrone.drawImage(spriteSheet,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
		this.currentFrame++;
	}
	else {
		this.hasHit = false;
		this.currentFrame = 0;
	}
	
};
//End Explosion functions





//Ship functions

function Ship() {
	this.srcX = 100;
	this.srcY = 400;
	this.drawX = Math.floor(Math.random()* (-200)); 
	this.drawY = Math.floor(Math.random()*300);
	this.width = 100;
	this.height = 100; 
	this.speed = Math.floor(Math.random()* 4 + 1);
}

Ship.prototype.drawShip = function () {
    //clearCtxShip(); This is very interesting...why can't it be here?
	this.drawX += this.speed;
	this.checkEscaped();
	ctxShip.drawImage(spriteSheet,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};

Ship.prototype.checkEscaped = function() {
	if(this.drawX > 700)
		this.recycle();
};

Ship.prototype.recycle = function() {
	this.drawX = -100;
};

function clearCtxShip() {
    ctxShip.clearRect(0,0,canvasWidth,canvasHeight);
}

//Ship functions


// event functions

function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;
	drone1.num = 0;
    if (keyID === 38 || keyID === 87) { //up arrow or W key
        drone1.isUpKey = true;
		drone1.keyLastPressed = "up";
        e.preventDefault();
    }
    if (keyID === 39 || keyID === 68) { //right arrow or D key
        drone1.isRightKey = true;
		drone1.keyLastPressed = "right";
        e.preventDefault();
    }
    if (keyID === 40 || keyID === 83) { //down arrow or S key
        drone1.isDownKey = true;
		drone1.keyLastPressed = "down";
        e.preventDefault();
    }
    if (keyID === 37 || keyID === 65) { //left arrow or A key
        drone1.isLeftKey = true;
		drone1.keyLastPressed = "left";
        e.preventDefault();
    }
	if (keyID === 32) { //spacebar
        drone1.isSpacebar = true;
		//not sure if I really need this
		//drone1.keyLastPressed = "spacebar"; 
        e.preventDefault();
    }
}


function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;
    if (keyID === 38 || keyID === 87) { //up arrow or W key
        drone1.isUpKey = false;
        e.preventDefault();
    }
    if (keyID === 39 || keyID === 68) { //right arrow or D key
        drone1.isRightKey = false;
        e.preventDefault();
    }
    if (keyID === 40 || keyID === 83) { //down arrow or S key
        drone1.isDownKey = false;
        e.preventDefault();
    }
    if (keyID === 37 || keyID === 65) { //left arrow or A key
        drone1.isLeftKey = false;
        e.preventDefault();
    }
	if (keyID === 32) { //spacebar
        drone1.isSpacebar = false;
        e.preventDefault();
    }
}


// end of event functions
