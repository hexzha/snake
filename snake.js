const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// CREATE THE UNIT
const box = 32;

// LOAD IMAGES
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// LOAD AUDIO FILES
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";

// CREATE THE SNAKE
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// CREATE THE FOOD
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// CREATE THE SCORE VAR
let score = 0;

// CONTROL THE SNAKE
let dir;

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && dir != "RIGHT") {
        dir = "LEFT";
   	left.play(); 
    } else if (event.keyCode == 38 && dir != "DOWN") {
        dir = "UP";
   	up.play(); 
    } else if (event.keyCode == 39 && dir != "LEFT") {
        dir = "RIGHT";
   	right.play(); 
    } else if (event.keyCode == 40 && dir != "UP") {
        dir = "DOWN";
   	down.play(); 
    }
}

// COLLISION DETECTION 
function collision(head, snake) {
    for(let i = 0; i < snake.length; i++) {
	if(head.x == snake[i].x && head.y == snake[i].y) {
	    return true;
	}
    }
    if(head.x < box || head.x > 17 * box || head.y < 3 * box || head.y > 17 * box) {
	return true;
    }
    return false;
}

// DRAW EVERYTHING TO THE CANVAS
function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // OLD HEAD POSITION
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // NEW HEAD POSITION
    if (dir == "LEFT") {
        snakeX -= box;
    } else if (dir == "UP") {
        snakeY -= box;
    } else if (dir == "RIGHT") {
        snakeX += box;
    } else if (dir == "DOWN") {
        snakeY += box;
    }

    // CHECK IF SNAKE EATS FOOD
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
   	eat.play(); 
    } else {
        // REMOVE THE TAIL OTHERWISE
        snake.pop();
    }

    // ADD NEW HEAD
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // GAME OVER
    if(collision(newHead, snake)) {
   	dead.play(); 
	clearInterval(game);	
    }

    snake.unshift(newHead);

    // UPDATE SCORE
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// CALL DRAW FUNCTION EVERY 100 ms
let game = setInterval(draw, 100);
