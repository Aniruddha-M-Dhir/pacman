

//board 
let board;
const rowCount = 21;
const columnCount = 19
tileSize = 32;
const boardWidth = columnCount*tileSize;
const boardHeight = rowCount*tileSize;
let context;

//images
let blueGhostImage;
let redGhostImage;
let orangeGhostImage
let pinkGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;


//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

const directions = ['U', 'D', 'L', 'R'];
let score = 0;
let lives = 3;
let gameOver = false;



window.onload = function() {

    let canvas = document.getElementById("board");
    canvas.width = boardWidth;
    canvas.height = boardHeight;
    context = canvas.getContext("2d");

    loadImages();
    loadMap();
    console.log(walls.size);
    console.log(foods.size);
    console.log(ghosts.size);
    console.log(pacman.x, pacman.y);
    for (let ghost of ghosts.values()) {
        const newDirection = directions[Math.floor(Math.random()*4)];
        ghost.updateDirection(newDirection);
    }
    update();
    document.addEventListener("keydown", movePacman);

}




function loadImages() {
  blueGhostImage = new Image();
  blueGhostImage.src = "images/blueGhost.png";

  redGhostImage = new Image();
  redGhostImage.src = "images/redGhost.png";

  pinkGhostImage = new Image();
    pinkGhostImage.src = "images/pinkGhost.png";


  orangeGhostImage = new Image();
    orangeGhostImage.src = "images/orangeGhost.png";

  pacmanUpImage = new Image();
  pacmanUpImage.src = "images/pacmanUp.png";

  pacmanDownImage = new Image();
  pacmanDownImage.src = "images/pacmanDown.png";

  pacmanLeftImage = new Image();
  pacmanLeftImage.src = "images/pacmanLeft.png";

  pacmanRightImage = new Image();
  pacmanRightImage.src = "images/pacmanRight.png";

  wallImage = new Image();
  wallImage.src = "images/wall.png";
}

function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();

    
    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r * tileSize;
            
            if (tileMapChar == 'X') {
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);

            }
            else if (tileMapChar == 'b') {
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
             else if (tileMapChar == 'o') {
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
             else if (tileMapChar == 'p') {
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
             else if (tileMapChar == 'r') {
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
             else if (tileMapChar == 'P') {
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
        
            }
            else if (tileMapChar == ' ') {
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
        
        }
    }
}
    function update() {
        if (gameOver) {
            return;
        }
        move();
        draw();
        setTimeout(update, 50);//20FPS
        
    }
    function draw() {
        context.clearRect(0, 0, boardWidth, boardHeight);
        context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
        for (let ghost of ghosts.values()) {
            context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
        }
        for (let wall of walls.values()) {
            context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
        }
        context.fillStyle = "yellow";
        for (let food of foods.values()) {
            context.fillRect(food.x, food.y, food.width, food.height);
        }
        //score
        context.fillStyle = "white";
        context.font = "24px Arial";
        if (gameOver) {
            context.fillText("Game Over! "+ String (score), tileSize/2, tileSize/2);
        } else {
            context.fillText("x " + String(lives)+ " score: " + String(score), tileSize/2, tileSize/2);
        }
    }

    function move() {
  pacman.x += pacman.velocityX;
  pacman.y += pacman.velocityY;

  // walls vs pacman
  for (let wall of walls.values()) {
    if (checkCollision(pacman, wall)) {
      pacman.x -= pacman.velocityX;
      pacman.y -= pacman.velocityY;
      break;
    }
  }

  // ghosts
  for (let ghost of ghosts.values()) {
    if (ghost.y === tileSize * 9 && ghost.direction !== 'U' && ghost.direction !== 'D') {
      ghost.updateDirection('U');
    }

    ghost.x += ghost.velocityX;
    ghost.y += ghost.velocityY;

    // walls vs ghost + bounds
    for (let wall of walls.values()) {
      if (
        checkCollision(ghost, wall) ||
        ghost.x <= 0 || ghost.x + ghost.width >= boardWidth ||
        ghost.y < 0 || ghost.y + ghost.height >= boardHeight
      ) {
        ghost.x -= ghost.velocityX;
        ghost.y -= ghost.velocityY;
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
        break;
      }
    }

    // pacman vs ghost
    if (checkCollision(pacman, ghost)) {
      lives -= 1;
      
      if (lives == 0){

        gameOver = true;
        return;
      } 
      resetPositions();
      
    }
  }

  // food
  let foodEaten = null;
  for (let food of foods.values()) {
    if (checkCollision(pacman, food)) {
      foodEaten = food;
      score += 10;
      break;
    }
  }
  foods.delete(foodEaten);

  if (foods.size == 0) {
    loadMap();
    resetPositions();
  }
    
  }




    function movePacman(e) {
        if (gameOver) {
            loadMap();
            resetPositions();
            score = 0;
            lives = 3;
            gameOver = false;
            update();//restart the game loop
            return;
        }
        if (e.code == "ArrowUp" || e.code == "KeyW") {
            pacman.updateDirection('U');
            pacman.image = pacmanUpImage;
        }
        else if (e.code == "ArrowDown" || e.code == "KeyS") {
            pacman.updateDirection('D');
            pacman.image = pacmanDownImage;
        }
        else if (e.code == "ArrowLeft" || e.code == "KeyA") {
            pacman.updateDirection('L');
            pacman.image = pacmanLeftImage;
        }
        else if (e.code == "ArrowRight" || e.code == "KeyD") {
            pacman.updateDirection('R');
            pacman.image = pacmanRightImage;
        }
    }

    function checkCollision(a, b) {
        return a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y;
    }
    function resetPositions() {
        pacman.reset();
        pacman.velocityX = 0;
        pacman.velocityY = 0;
        for (let ghost of ghosts.values()) {
            ghost.reset();
            const newDirection = directions[Math.floor(Math.random()*4)];
            ghost.updateDirection(newDirection);
        }
    }




class Block {
    constructor(image, x, y, width,height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.startX = x;
        this.startY = y;

        this.direction = 'R';
        this.velocityX= 0;
        this.velocityY= 0;
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()) {
            if (checkCollision(this, wall)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }
     }
    
    updateVelocity() {
        if (this.direction == 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize/4;
        }
        else if (this.direction == 'D') {
            this.velocityX = 0;
            this.velocityY = tileSize/4;
        }
        else if (this.direction == 'L') {
            this.velocityX = -tileSize/4;
            this.velocityY = 0;
        }
        else if (this.direction == 'R') {
            this.velocityX = tileSize/4;
            this.velocityY = 0;
        }
    }
    reset() {
        this.x = this.startX;
        this.y = this.startY;
        
    }
}
    


