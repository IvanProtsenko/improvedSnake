var canvas = document.getElementById("game");
var context = canvas.getContext('2d');
var pointsOutput = document.getElementById("points");

var grid = 16;
var count = 0;
var points = 0;

var snake = {
    x: 160,
    y: 160,
    vx: grid,
    vy: 0,
    cells: [],
    maxCell: 4,
}
var apple = {
    x: 320,
    y: 320
}
function getRandom() {
    return Math.floor(Math.random() * 25);
}

function getToBegin() {
    snake.x = 160;
    snake.y = 160;
    snake.vx = grid;
    snake.vy = 0;
    snake.cells = [];
    snake.maxCell= 4;
    apple.x = getRandom() * grid;
    apple.y = getRandom() * grid;
    points = 0;
    pointsOutput.innerHTML = "Очки: "+points;
}

function loop() {
    requestAnimationFrame(loop);
    if(++count < 4) return;
    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.vx;
    snake.y += snake.vy;
    if(snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        getToBegin();
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });
    if(snake.cells.length > snake.maxCell) {
        snake.cells.pop();
    }

    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

    context.fillStyle = "green";
    snake.cells.forEach(function(cell, index) {
        context.fillRect(cell.x, cell.y, grid-1, grid-1);
        if(apple.x == cell.x && apple.y == cell.y) {
            snake.maxCell++;
            points++;
            pointsOutput.innerHTML = "Очки: "+points;
            apple.x = getRandom() * grid;
            apple.y = getRandom() * grid;
        }
        for(let i = index+1; i < snake.cells.length; i++) {
            if(cell.x == snake.cells[i].x && cell.y == snake.cells[i].y) {
                getToBegin();
            }
        }
    });
}

document.addEventListener('keydown', function(w) {
    if(w.which == 37 && snake.vx == 0) {
        snake.vx = -grid;
        snake.vy = 0;
    } else if(w.which == 38 && snake.vy == 0) {
        snake.vy = -grid;
        snake.vx = 0;
    } else if(w.which == 39 && snake.vx == 0) {
        snake.vx = grid;
        snake.vy = 0;
    } else if(w.which == 40 && snake.vy == 0) {
        snake.vy = grid;
        snake.vx = 0;
    }
})

function startGame() {
    requestAnimationFrame(loop);
}