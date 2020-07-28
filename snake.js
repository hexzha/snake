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
    } else if (event.keyCode == 38 && dir != "DOWN") {
        dir = "UP";
    } else if (event.keyCode == 39 && dir != "LEFT") {
        dir = "RIGHT";
    } else if (event.keyCode == 40 && dir != "UP") {
        dir = "DOWN";
    }
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
    } else {
        // REMOVE THE TAIL OTHERWISE
        snake.pop();
    }

    // ADD NEW HEAD
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    // UPDATE SCORE
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// CALL DRAW FUNCTION EVERY 100 ms
let game = setInterval(draw, 100);