const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

let grid = 16;
let count = 0;
let score = 0;

let snake ={
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

let apple = {
    x: 320,
    y: 320
}; 

// This is a function that randomly generates integers
function getRandomInt(min, max) {
    return Math.floor(Math.random * (max - min)) + min;
}

let gameRunning = false;
let gamePaused = false;

let animationFrame;
let startButton = document.querySelector('.start-button')
let gameOverScreen = document.querySelector('.game-over')
let scoreDisplay = document.querySelector('.score-display')

startButton.addEventListener('click', function(){
        // console.log("Button is clicked!")
        startGame();
    }
);
gameOverScreen.addEventListener('click', function(){
        startGame();
    }
);

document.addEventListener('keydown', function(e){
    if (!gameRunning){
        return;
    }
    // CODE 37 = LEFT KEY
    if (e.which === 37 && snake.dx === 0){
        snake.dx = -grid;
        snake.dy = 0;
        // CODE 38 = UP KEY
    } else if (e.which === 38&& snake.dy === 0){
        snake.dy = -grid;
        snake.dx = 0;
        // CODE 39 = RIGHT KEY
    } else if (e.which === 39 && snake.dx === 0){
        snake.dx = grid;
        snake.dy = 0;
      // CODE 40 = DOWN KEY
    } else if (e.which === 40 && snake.dy === 0){
        snake.dy = grid;
        snake.dx = 0;
    }
});























// Game Loop Function
function loop(){
    if (!gameRunning || gamePaused) {
        return;
    }
}













// Start the game function
function startGame() {
    if (gameRunning){
        return; // just the game returns and will not execute of the following code
    }
}

// End game function

function endGame() {
    gameRunning = false;
    gamePaused = true;
}



