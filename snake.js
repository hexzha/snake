const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// CREATE THE UNIT
const box = 32;

// LOAD IMAGES
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// CREATE THE SNAKE
let snake = [];
snake[0] = {
	x : 9 * box, 
	y : 10 * box
}

// CREATE THE FOOD
let food = {
	x : Math.floor(Math.random()*17 + 1) * box, 
	y : Math.floor(Math.random()*15 + 3) * box
}

// CREATE THE SCORE VAR
let score = 0;

// DRAW EVERYTHING TO THE CANVAS
function draw() {
	ctx.drawImage(ground, 0, 0);
	
	for(let i = 0; i < snake.length; i++) {

	}

}

// CALL DRAW FUNCTION EVERY 100 ms
let game = setInterval(draw, 100);




