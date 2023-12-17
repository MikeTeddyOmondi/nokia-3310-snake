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



