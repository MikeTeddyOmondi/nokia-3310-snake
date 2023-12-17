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

    let gem = {
        x: 320,
        y: 320
    }; 

    // This is a function that randomly generates integers
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
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

    // Event listener for game start
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function(e){
        if (!gameRunning){
            return;
        }
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    })

    document.addEventListener('touchmove', function(e){
        if (!gameRunning){
            return;
        }
    
        let touchEndX = e.touches[0].clientX;
        let touchEndY = e.touches[0].clientY;
        let dx = touchEndX - touchStartX;
        let dy = touchEndY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)){
            //Horizontal swipe
            if (dx>0 && snake.dx === 0){
                snake.dx = grid;
                snake.dy = 0;
            } else if (dx<0 && snake.dx ===0){
                snake.dx = -grid;
                snake.dy = 0;
            }        
            else {
            // Vertical Swipe
            if (dy>0 && snake.dy===0){
                snake.dy = grid;
                snake.dx = 0;
            } else if (dy<0 && dy===0){
                snake.dy = -grid;
                snake.dx = 0;
            }     
            }
        }
    });
    // Game Loop Function
    function loop(){
        if (!gameRunning || gamePaused) {
            return;
        }
        animationFrame = requestAnimationFrame(loop);
        //requestAnimationFrame: this is a beowser API telling the browser that you - player - wish yo update the animation before the next repaint/rendering.
        //animationFrame: The variable that is going to be used to keep track of the ID returned by  requestAnimationFrame.
        
        // Control game loop speed
        if (++count <100){
            return;
        }
        // This is the snake speed, feel free to change it as suits you.
        count = 95;
        
        //Game logic and elements rendering on the canvas
        context.clearRect(0,0,canvas.width, canvas.height);
        snake.x += snake.dx;
        snake.y += snake.dy;

        //Wrap snake position on screen edges
        if (snake.x <0){
            snake.x = canvas.width - grid;
        } else if (snake.x >= canvas.width){
            snake.x = 0;
        }
        if (snake.y <0){
            snake.y = canvas.height - grid;
        } else if (snake.y >= canvas.height){
            snake.y = 0;
        }

        // Add a snake head to the snake.cells array
        snake.cells.unshift({x: snake.x, y: snake.y});
        // Limit snake cell count
        if (snake.cells.length > snake.maxCells){
            snake.cells.pop();
        }

        // Draw the gems
        context.fillStyle = 'white';
        context.fillRect(gem.x, gem.y, grid - 1, grid - 1);

        //Shadow properties
        context.shadowColor = 'rgba(0,0,0, 0.5)';
        context.shadowBlur = 5;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.fillStyle = '#061138';
        // Draw the snake cells
        snake.cells.forEach(function(cell, index){
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // check if the snake's head is at the position of the gem
        if (cell.x === gem.x && cell.y === gem.y){
            // snake eat the gem!
            snake.maxCells++;
            score++;
            scoreDisplay.textContent = score;
        // Generate random position for the gems on the screen
        gem.x = getRandomInt(0,25) * grid;
        gem.y = getRandomInt(0,25) * grid;
        }
        //Check for collision detection
        for (let i = index + 1; i < snake.cells.length; i++){
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                // Invoking the endGame method created below
                endGame();
            }
        }
    })
};

    // Start the game function
    function startGame() {
        if (gameRunning){
            return; // just the game returns and will not execute of the following code
        }
        gameRunning = true;
        gamePaused = false;
        score = 0;
        snake.x = 160; 
        snake.y = 160;
        snake.cells =[];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        gem.x = getRandomInt(0,25) * grid;
        gem.y = getRandomInt(0,25) * grid;
        startButton.style.display = 'none';
        gameOverScreen.style.display = 'none';
        scoreDisplay.textContent = score;

        if (animationFrame){
            cancelAnimationFrame(animationFrame);
        }
        //Start the Game Loop
        animationFrame = requestAnimationFrame(loop);
    };

    // End game function
    function endGame() {
        gameRunning = false;
        gamePaused = true;
        gameOverScreen.style.display = 'block';
        document.querySelector('.game-over .score-display').textContent = score;
        if(animationFrame){
            cancelAnimationFrame(animationFrame)
        }
    };



