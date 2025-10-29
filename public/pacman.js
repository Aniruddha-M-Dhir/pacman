

// //board 
// let board;
// const rowCount = 21;
// const columnCount = 19
// tileSize = 32;
// const boardWidth = columnCount*tileSize;
// const boardHeight = rowCount*tileSize;
// let context;

// //images
// let blueGhostImage;
// let redGhostImage;
// let orangeGhostImage
// let pinkGhostImage;
// let pacmanUpImage;
// let pacmanDownImage;
// let pacmanLeftImage;
// let pacmanRightImage;
// let wallImage;


// //X = wall, O = skip, P = pac man, ' ' = food
// //Ghosts: b = blue, o = orange, p = pink, r = red
// const tileMap = [
//     "XXXXXXXXXXXXXXXXXXX",
//     "X        X        X",
//     "X XX XXX X XXX XX X",
//     "X                 X",
//     "X XX X XXXXX X XX X",
//     "X    X       X    X",
//     "XXXX XXXX XXXX XXXX",
//     "OOOX X       X XOOO",
//     "XXXX X XXrXX X XXXX",
//     "O       bpo       O",
//     "XXXX X XXXXX X XXXX",
//     "OOOX X       X XOOO",
//     "XXXX X XXXXX X XXXX",
//     "X        X        X",
//     "X XX XXX X XXX XX X",
//     "X  X     P     X  X",
//     "XX X X XXXXX X X XX",
//     "X    X   X   X    X",
//     "X XXXXXX X XXXXXX X",
//     "X                 X",
//     "XXXXXXXXXXXXXXXXXXX" 
// ];

// const walls = new Set();
// const foods = new Set();
// const ghosts = new Set();
// let pacman;

// const directions = ['U', 'D', 'L', 'R'];
// let score = 0;
// let lives = 3;
// let gameOver = false;



// window.onload = function() {

//     let canvas = document.getElementById("board");
//     canvas.width = boardWidth;
//     canvas.height = boardHeight;
//     context = canvas.getContext("2d");

//     loadImages();
//     loadMap();
//     console.log(walls.size);
//     console.log(foods.size);
//     console.log(ghosts.size);
//     console.log(pacman.x, pacman.y);
//     for (let ghost of ghosts.values()) {
//         const newDirection = directions[Math.floor(Math.random()*4)];
//         ghost.updateDirection(newDirection);
//     }
//     update();
//     document.addEventListener("keydown", movePacman);

// }




// function loadImages() {
//   blueGhostImage = new Image();
//   blueGhostImage.src = "images/blueGhost.png";

//   redGhostImage = new Image();
//   redGhostImage.src = "images/redGhost.png";

//   pinkGhostImage = new Image();
//     pinkGhostImage.src = "images/pinkGhost.png";


//   orangeGhostImage = new Image();
//     orangeGhostImage.src = "images/orangeGhost.png";

//   pacmanUpImage = new Image();
//   pacmanUpImage.src = "images/pacmanUp.png";

//   pacmanDownImage = new Image();
//   pacmanDownImage.src = "images/pacmanDown.png";

//   pacmanLeftImage = new Image();
//   pacmanLeftImage.src = "images/pacmanLeft.png";

//   pacmanRightImage = new Image();
//   pacmanRightImage.src = "images/pacmanRight.png";

//   wallImage = new Image();
//   wallImage.src = "images/wall.png";
// }

// function loadMap() {
//     walls.clear();
//     foods.clear();
//     ghosts.clear();

    
//     for (let r = 0; r < rowCount; r++) {
//         for (let c = 0; c < columnCount; c++) {
//             const row = tileMap[r];
//             const tileMapChar = row[c];

//             const x = c * tileSize;
//             const y = r * tileSize;
            
//             if (tileMapChar == 'X') {
//                 const wall = new Block(wallImage, x, y, tileSize, tileSize);
//                 walls.add(wall);

//             }
//             else if (tileMapChar == 'b') {
//                 const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
//                 ghosts.add(ghost);
//             }
//              else if (tileMapChar == 'o') {
//                 const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
//                 ghosts.add(ghost);
//             }
//              else if (tileMapChar == 'p') {
//                 const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
//                 ghosts.add(ghost);
//             }
//              else if (tileMapChar == 'r') {
//                 const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
//                 ghosts.add(ghost);
//             }
//              else if (tileMapChar == 'P') {
//                 pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
        
//             }
//             else if (tileMapChar == ' ') {
//                 const food = new Block(null, x + 14, y + 14, 4, 4);
//                 foods.add(food);
//             }
        
//         }
//     }
// }
//     function update() {
//         if (gameOver) {
//             return;
//         }
//         move();
//         draw();
//         setTimeout(update, 50);//20FPS
        
//     }
//     function draw() {
//         context.clearRect(0, 0, boardWidth, boardHeight);
//         context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
//         for (let ghost of ghosts.values()) {
//             context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
//         }
//         for (let wall of walls.values()) {
//             context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
//         }
//         context.fillStyle = "yellow";
//         for (let food of foods.values()) {
//             context.fillRect(food.x, food.y, food.width, food.height);
//         }
//         //score
//         context.fillStyle = "white";
//         context.font = "24px Arial";
//         if (gameOver) {
//             context.fillText("Game Over! "+ String (score), tileSize/2, tileSize/2);
//         } else {
//             context.fillText("x " + String(lives)+ " score: " + String(score), tileSize/2, tileSize/2);
//         }
//     }

//     function move() {
//   pacman.x += pacman.velocityX;
//   pacman.y += pacman.velocityY;

//   // walls vs pacman
//   for (let wall of walls.values()) {
//     if (checkCollision(pacman, wall)) {
//       pacman.x -= pacman.velocityX;
//       pacman.y -= pacman.velocityY;
//       break;
//     }
//   }

//   // ghosts
//   for (let ghost of ghosts.values()) {
//     if (ghost.y === tileSize * 9 && ghost.direction !== 'U' && ghost.direction !== 'D') {
//       ghost.updateDirection('U');
//     }

//     ghost.x += ghost.velocityX;
//     ghost.y += ghost.velocityY;

//     // walls vs ghost + bounds
//     for (let wall of walls.values()) {
//       if (
//         checkCollision(ghost, wall) ||
//         ghost.x <= 0 || ghost.x + ghost.width >= boardWidth ||
//         ghost.y < 0 || ghost.y + ghost.height >= boardHeight
//       ) {
//         ghost.x -= ghost.velocityX;
//         ghost.y -= ghost.velocityY;
//         const newDirection = directions[Math.floor(Math.random() * 4)];
//         ghost.updateDirection(newDirection);
//         break;
//       }
//     }

//     // pacman vs ghost
//     if (checkCollision(pacman, ghost)) {
//       lives -= 1;
      
//       if (lives == 0){

//         gameOver = true;
//         return;
//       } 
//       resetPositions();
      
//     }
//   }

//   // food
//   let foodEaten = null;
//   for (let food of foods.values()) {
//     if (checkCollision(pacman, food)) {
//       foodEaten = food;
//       score += 10;
//       break;
//     }
//   }
//   foods.delete(foodEaten);

//   if (foods.size == 0) {
//     loadMap();
//     resetPositions();
//   }
    
//   }




//     function movePacman(e) {
//         if (gameOver) {
//             loadMap();
//             resetPositions();
//             score = 0;
//             lives = 3;
//             gameOver = false;
//             update();//restart the game loop
//             return;
//         }
//         if (e.code == "ArrowUp" || e.code == "KeyW") {
//             pacman.updateDirection('U');
//             pacman.image = pacmanUpImage;
//         }
//         else if (e.code == "ArrowDown" || e.code == "KeyS") {
//             pacman.updateDirection('D');
//             pacman.image = pacmanDownImage;
//         }
//         else if (e.code == "ArrowLeft" || e.code == "KeyA") {
//             pacman.updateDirection('L');
//             pacman.image = pacmanLeftImage;
//         }
//         else if (e.code == "ArrowRight" || e.code == "KeyD") {
//             pacman.updateDirection('R');
//             pacman.image = pacmanRightImage;
//         }
//     }

//     function checkCollision(a, b) {
//         return a.x < b.x + b.width &&
//                 a.x + a.width > b.x &&
//                 a.y < b.y + b.height &&
//                 a.y + a.height > b.y;
//     }
//     function resetPositions() {
//         pacman.reset();
//         pacman.velocityX = 0;
//         pacman.velocityY = 0;
//         for (let ghost of ghosts.values()) {
//             ghost.reset();
//             const newDirection = directions[Math.floor(Math.random()*4)];
//             ghost.updateDirection(newDirection);
//         }
//     }




// class Block {
//     constructor(image, x, y, width,height) {
//         this.x = x;
//         this.y = y;
//         this.image = image;
//         this.width = width;
//         this.height = height;
//         this.startX = x;
//         this.startY = y;

//         this.direction = 'R';
//         this.velocityX= 0;
//         this.velocityY= 0;
//     }

//     updateDirection(direction) {
//         const prevDirection = this.direction;
//         this.direction = direction;
//         this.updateVelocity();
//         this.x += this.velocityX;
//         this.y += this.velocityY;

//         for (let wall of walls.values()) {
//             if (checkCollision(this, wall)) {
//                 this.x -= this.velocityX;
//                 this.y -= this.velocityY;
//                 this.direction = prevDirection;
//                 this.updateVelocity();
//                 return;
//             }
//         }
//      }
    
//     updateVelocity() {
//         if (this.direction == 'U') {
//             this.velocityX = 0;
//             this.velocityY = -tileSize/4;
//         }
//         else if (this.direction == 'D') {
//             this.velocityX = 0;
//             this.velocityY = tileSize/4;
//         }
//         else if (this.direction == 'L') {
//             this.velocityX = -tileSize/4;
//             this.velocityY = 0;
//         }
//         else if (this.direction == 'R') {
//             this.velocityX = tileSize/4;
//             this.velocityY = 0;
//         }
//     }
//     reset() {
//         this.x = this.startX;
//         this.y = this.startY;
        
//     }
// }
    
// ===== Board / Game State =====
// let board;
// const rowCount = 21;
// const columnCount = 19;
// const tileSize = 32;
// const boardWidth  = columnCount * tileSize;
// const boardHeight = rowCount    * tileSize;
// let context;

// // Images
// let blueGhostImage;
// let redGhostImage;
// let orangeGhostImage;
// let pinkGhostImage;
// let pacmanUpImage;
// let pacmanDownImage;
// let pacmanLeftImage;
// let pacmanRightImage;
// let wallImage;

// // Map legend: X=wall, O=skip, ' '=food, P=pacman, ghosts b/o/p/r
// const tileMap = [
//   "XXXXXXXXXXXXXXXXXXX",
//   "X        X        X",
//   "X XX XXX X XXX XX X",
//   "X                 X",
//   "X XX X XXXXX X XX X",
//   "X    X       X    X",
//   "XXXX XXXX XXXX XXXX",
//   "OOOX X       X XOOO",
//   "XXXX X XXrXX X XXXX",
//   "X       bpo       X",
//   "XXXX X XXXXX X XXXX",
//   "OOOX X       X XOOO",
//   "XXXX X XXXXX X XXXX",
//   "X        X        X",
//   "X XX XXX X XXX XX X",
//   "X  X     P     X  X",
//   "XX X X XXXXX X X XX",
//   "X    X   X   X    X",
//   "X XXXXXX X XXXXXX X",
//   "X                 X",
//   "XXXXXXXXXXXXXXXXXXX"
// ];

// const walls  = new Set();
// const foods  = new Set();
// const ghosts = new Set();
// let pacman;

// const directions = ['U', 'D', 'L', 'R'];
// let score = 0;
// let lives = 3;
// let gameOver = false;

// // --- Classic-feel movement control ---
// let activeDirection = null;   // current Pac-Man direction
// let pendingDirection = null;  // queued direction to apply at turn
// const step = tileSize / 4;    // speed per logic step

// // loop timing
// const STEP_MS = 50; // ~20 FPS logic step
// let lastTs = 0;
// let running = false;

// window.onload = function () {
//   const canvas = document.getElementById("board");
//   canvas.width  = boardWidth;
//   canvas.height = boardHeight;
//   context = canvas.getContext("2d");

//   loadImages();
//   loadMap();

//   // Ensure each ghost starts with a valid direction (no stalling at spawn)
//   for (let ghost of ghosts.values()) {
//     const opts = validDirections(ghost);
//     if (opts.length) ghost.updateDirection(chooseRandom(opts));
//   }

//   startGameLoop();
//   document.addEventListener("keydown", handleKey);
// };

// // ===== Assets =====
// function loadImages() {
//   blueGhostImage   = new Image(); blueGhostImage.src   = "images/blueGhost.png";
//   redGhostImage    = new Image(); redGhostImage.src    = "images/redGhost.png";
//   pinkGhostImage   = new Image(); pinkGhostImage.src   = "images/pinkGhost.png";
//   orangeGhostImage = new Image(); orangeGhostImage.src = "images/orangeGhost.png";

//   pacmanUpImage    = new Image(); pacmanUpImage.src    = "images/pacmanUp.png";
//   pacmanDownImage  = new Image(); pacmanDownImage.src  = "images/pacmanDown.png";
//   pacmanLeftImage  = new Image(); pacmanLeftImage.src  = "images/pacmanLeft.png";
//   pacmanRightImage = new Image(); pacmanRightImage.src = "images/pacmanRight.png";

//   wallImage        = new Image(); wallImage.src        = "images/wall.png";
// }

// // ===== Map =====
// function loadMap() {
//   walls.clear();
//   foods.clear();
//   ghosts.clear();
//   pacman = undefined;

//   for (let r = 0; r < rowCount; r++) {
//     for (let c = 0; c < columnCount; c++) {
//       const ch = tileMap[r][c];
//       const x = c * tileSize;
//       const y = r * tileSize;

//       if (ch === 'X') walls.add(new Block(wallImage, x, y, tileSize, tileSize));
//       else if (ch === 'b') ghosts.add(new Block(blueGhostImage, x, y, tileSize, tileSize));
//       else if (ch === 'o') ghosts.add(new Block(orangeGhostImage, x, y, tileSize, tileSize));
//       else if (ch === 'p') ghosts.add(new Block(pinkGhostImage, x, y, tileSize, tileSize));
//       else if (ch === 'r') ghosts.add(new Block(redGhostImage, x, y, tileSize, tileSize));
//       else if (ch === 'P') pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
//       else if (ch === ' ') foods.add(new Block(null, x + 14, y + 14, 4, 4)); // original pellet size/pos
//     }
//   }

//   // set initial direction (right)
//   activeDirection = 'R';
//   pendingDirection = null;
//   pacman.setVelocity(activeDirection);
// }

// // ===== Loop =====
// function startGameLoop() {
//   if (running) return;
//   running = true;
//   lastTs = performance.now();
//   requestAnimationFrame(gameLoop);
// }

// function gameLoop(ts) {
//   if (gameOver) { running = false; draw(); return; }

//   if (ts - lastTs >= STEP_MS) {
//     move();
//     lastTs = ts;
//   }
//   draw();
//   if (running) requestAnimationFrame(gameLoop);
// }

// // ===== Draw =====
// function draw() {
//   context.clearRect(0, 0, boardWidth, boardHeight);

//   // 1) Walls
//   for (let wall of walls.values()) {
//     context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
//   }

//   // 2) Food
//   context.fillStyle = "yellow";
//   for (let food of foods.values()) {
//     context.fillRect(food.x, food.y, food.width, food.height);
//   }

//   // 3) Ghosts
//   for (let ghost of ghosts.values()) {
//     context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
//   }

//   // 4) Pac-Man
//   if (pacman) {
//     context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
//   }

//   // HUD
//   context.fillStyle = "white";
//   context.font = "24px Arial";
//   const text = gameOver ? `Game Over! ${score}` : `x ${lives}  score: ${score}`;
//   context.fillText(text, tileSize/2, tileSize/2);
// }

// // ===== Movement / Physics =====
// function move() {
//   // ----- PAC-MAN (OG movement) -----

//   // 1) Allow instant reverse at any time
//   if (pendingDirection && activeDirection && isOpposite(pendingDirection, activeDirection)) {
//     if (canGo(pacman, pendingDirection)) {
//       activeDirection = pendingDirection;
//       pendingDirection = null;
//       pacman.setVelocity(activeDirection);
//       updateFacingImage(pacman, activeDirection);
//       if (activeDirection === 'L' || activeDirection === 'R') snapAxis(pacman, 'y');
//       else snapAxis(pacman, 'x');
//     }
//   }

//   // 2) Take queued perpendicular turn when aligned to grid on the other axis
//   if (pendingDirection && canTurnNow(pacman, pendingDirection) && canGo(pacman, pendingDirection)) {
//     activeDirection = pendingDirection;
//     pendingDirection = null;
//     pacman.setVelocity(activeDirection);
//     updateFacingImage(pacman, activeDirection);
//     if (activeDirection === 'L' || activeDirection === 'R') snapAxis(pacman, 'y');
//     else snapAxis(pacman, 'x');
//   }

//   // 3) Move or stop centered if blocked
//   if (activeDirection && canGo(pacman, activeDirection)) {
//     pacman.x += pacman.velocityX;
//     pacman.y += pacman.velocityY;
//   } else {
//     snapToTileCenter(pacman);
//     pacman.velocityX = 0;
//     pacman.velocityY = 0;
//   }

//   // ----- GHOSTS (random wandering, no stalls) -----
//   for (let ghost of ghosts.values()) {
//     // If centered on a tile, pick a random valid direction (prefer not to reverse)
//     if (onGrid(ghost)) {
//       let opts = validDirections(ghost);

//       if (opts.length > 1 && ghost.direction) {
//         const nonReverse = opts.filter(d => !isOpposite(d, ghost.direction));
//         if (nonReverse.length) opts = nonReverse;
//       }

//       // If not moving or current dir not valid, choose a new one
//       const moving = ghost.velocityX !== 0 || ghost.velocityY !== 0;
//       if (!moving || !opts.includes(ghost.direction)) {
//         ghost.updateDirection(chooseRandom(opts));
//       }
//       // Optional extra-chaos: occasionally re-roll while moving
//       // if (Math.random() < 0.15) ghost.updateDirection(chooseRandom(opts));
//     }

//     // Try to advance; if blocked mid-corridor, immediately choose another valid dir
//     const nextX = ghost.x + ghost.velocityX;
//     const nextY = ghost.y + ghost.velocityY;
//     if (!canGoRect(ghost, nextX, nextY)) {
//       let opts = validDirections(ghost);
//       if (opts.length > 1 && ghost.direction) {
//         const nonReverse = opts.filter(d => !isOpposite(d, ghost.direction));
//         if (nonReverse.length) opts = nonReverse;
//       }
//       if (opts.length) ghost.updateDirection(chooseRandom(opts));
//     } else {
//       ghost.x = nextX;
//       ghost.y = nextY;
//     }

//     // pacman vs ghost
//     if (checkCollision(pacman, ghost)) {
//       lives -= 1;
//       if (lives === 0) { gameOver = true; return; }
//       resetPositions();
//       return; // skip rest of frame after reset
//     }
//   }

//   // ----- FOOD -----
//   let eaten = null;
//   for (let food of foods.values()) {
//     if (checkCollision(pacman, food)) {
//       eaten = food;
//       score += 10;
//       break;
//     }
//   }
//   if (eaten) foods.delete(eaten);

//   // level cleared
//   if (foods.size === 0) {
//     loadMap();
//     resetPositions();
//   }
// }

// // ===== Input (queued turns) =====
// function handleKey(e) {
//   if (gameOver) {
//     if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"].includes(e.code)) {
//       loadMap();
//       resetPositions();
//       score = 0;
//       lives = 3;
//       gameOver = false;
//       startGameLoop();
//     }
//     return;
//   }

//   if (e.code === "ArrowUp" || e.code === "KeyW") {
//     pendingDirection = 'U';
//     updateFacingImage(pacman, 'U');
//   } else if (e.code === "ArrowDown" || e.code === "KeyS") {
//     pendingDirection = 'D';
//     updateFacingImage(pacman, 'D');
//   } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
//     pendingDirection = 'L';
//     updateFacingImage(pacman, 'L');
//   } else if (e.code === "ArrowRight" || e.code === "KeyD") {
//     pendingDirection = 'R';
//     updateFacingImage(pacman, 'R');
//   }
// }

// // ===== Helpers (Pac-Man feel) =====
// function gridIndex(pos) {
//   return Math.round(pos / tileSize);
// }
// function tileCenterCoord(index) {
//   return index * tileSize;
// }
// function isOpposite(a, b) {
//   return (a === 'L' && b === 'R') || (a === 'R' && b === 'L') ||
//          (a === 'U' && b === 'D') || (a === 'D' && b === 'U');
// }
// function canTurnNow(entity, dir) {
//   if (dir === 'L' || dir === 'R') return (Math.round(entity.y) % tileSize) === 0;
//   else return (Math.round(entity.x) % tileSize) === 0;
// }
// function snapAxis(entity, axis) {
//   if (axis === 'x') entity.x = tileCenterCoord(gridIndex(entity.x));
//   else entity.y = tileCenterCoord(gridIndex(entity.y));
// }
// function snapToTileCenter(entity) {
//   entity.x = tileCenterCoord(gridIndex(entity.x));
//   entity.y = tileCenterCoord(gridIndex(entity.y));
// }
// function canGo(entity, dir) {
//   let vx = 0, vy = 0;
//   if (dir === 'U') vy = -step;
//   else if (dir === 'D') vy =  step;
//   else if (dir === 'L') vx = -step;
//   else if (dir === 'R') vx =  step;
//   return canGoRect(entity, entity.x + vx, entity.y + vy);
// }
// function canGoRect(entity, nx, ny) {
//   const probe = { x: nx, y: ny, width: entity.width, height: entity.height };
//   for (let wall of walls.values()) if (checkCollision(probe, wall)) return false;
//   if (nx < 0 || ny < 0 || nx + entity.width > boardWidth || ny + entity.height > boardHeight) return false;
//   return true;
// }
// function updateFacingImage(ent, dir) {
//   if (dir === 'U') ent.image = pacmanUpImage;
//   else if (dir === 'D') ent.image = pacmanDownImage;
//   else if (dir === 'L') ent.image = pacmanLeftImage;
//   else if (dir === 'R') ent.image = pacmanRightImage;
// }

// // ===== Ghost-movement helpers =====
// function onGrid(entity) {
//   return (Math.round(entity.x) % tileSize) === 0 &&
//          (Math.round(entity.y) % tileSize) === 0;
// }
// function validDirections(entity) {
//   return directions.filter(d => canGo(entity, d));
// }
// function chooseRandom(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// // ===== Utils =====
// function checkCollision(a, b) {
//   return a.x < b.x + b.width &&
//          a.x + a.width > b.x &&
//          a.y < b.y + b.height &&
//          a.y + a.height > b.y;
// }
// function resetPositions() {
//   pacman.reset();
//   activeDirection = 'R';
//   pendingDirection = null;
//   pacman.setVelocity(activeDirection);

//   for (let ghost of ghosts.values()) {
//     ghost.reset();
//     const opts = validDirections(ghost);
//     if (opts.length) ghost.updateDirection(chooseRandom(opts));
//   }
// }

// // ===== Entity =====
// class Block {
//   constructor(image, x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.image = image;
//     this.width = width;
//     this.height = height;
//     this.startX = x;
//     this.startY = y;

//     this.direction = 'R';
//     this.velocityX = 0;
//     this.velocityY = 0;
//   }

//   setVelocity(direction) {
//     this.direction = direction;
//     if (direction === 'U') { this.velocityX = 0; this.velocityY = -step; }
//     if (direction === 'D') { this.velocityX = 0; this.velocityY =  step; }
//     if (direction === 'L') { this.velocityX = -step; this.velocityY = 0; }
//     if (direction === 'R') { this.velocityX =  step; this.velocityY = 0; }
//   }

//   updateDirection(direction) {
//     // ghosts (and also usable by pacman checks): only commit if the path is clear
//     if (canGo(this, direction)) {
//       this.setVelocity(direction);
//     }
//   }

//   reset() {
//     this.x = this.startX;
//     this.y = this.startY;
//     this.velocityX = 0;
//     this.velocityY = 0;
//     this.direction = 'R';
//   }
// }
let board;
    const rowCount = 21;
    const columnCount = 19;
    const tileSize = 32;
    const boardWidth  = columnCount * tileSize;
    const boardHeight = rowCount    * tileSize;
    let context;

    // Images
    let blueGhostImage;
    let redGhostImage;
    let orangeGhostImage;
    let pinkGhostImage;
    let pacmanUpImage;
    let pacmanDownImage;
    let pacmanLeftImage;
    let pacmanRightImage;
    let wallImage;

    // Map legend: X=wall, O=skip (empty), ' '=food, P=pacman, ghosts b/o/p/r
    // Redesigned to break long straights and add intersections.
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

    const walls  = new Set();
    const foods  = new Set();
    const ghosts = new Set();
    let pacman;

    const directions = ['U', 'D', 'L', 'R'];
    let score = 0;
    let lives = 3;
    let gameOver = false;

    // --- Classic-feel movement control ---
    let activeDirection = null;   // current Pac-Man direction
    let pendingDirection = null;  // queued direction to apply at turn
    const step = tileSize / 4;    // speed per logic step

    // loop timing
    const STEP_MS = 50; // ~20 FPS logic step
    let lastTs = 0;
    let running = false;

    // --- Ghost randomness knobs ---
    const TURN_PROB   = 0.65; // chance to take a turn at intersections even if straight is available
    const REROLL_PROB = 0.10; // chance to re-roll while moving between tiles

    window.onload = function () {
      const canvas = document.getElementById("board");
      canvas.width  = boardWidth;
      canvas.height = boardHeight;
      context = canvas.getContext("2d");

      loadImages();
      loadMap();

      // Ensure each ghost starts with a valid direction (no stalling at spawn)
      for (let ghost of ghosts.values()) {
        const opts = validDirections(ghost);
        if (opts.length) ghost.updateDirection(chooseRandom(opts));
      }

      startGameLoop();
      document.addEventListener("keydown", handleKey);
    };

    // ===== Assets =====
    function loadImages() {
      blueGhostImage   = new Image(); blueGhostImage.src   = "images/blueGhost.png";
      redGhostImage    = new Image(); redGhostImage.src    = "images/redGhost.png";
      pinkGhostImage   = new Image(); pinkGhostImage.src   = "images/pinkGhost.png";
      orangeGhostImage = new Image(); orangeGhostImage.src = "images/orangeGhost.png";

      pacmanUpImage    = new Image(); pacmanUpImage.src    = "images/pacmanUp.png";
      pacmanDownImage  = new Image(); pacmanDownImage.src  = "images/pacmanDown.png";
      pacmanLeftImage  = new Image(); pacmanLeftImage.src  = "images/pacmanLeft.png";
      pacmanRightImage = new Image(); pacmanRightImage.src = "images/pacmanRight.png";

      wallImage        = new Image(); wallImage.src        = "images/wall.png";
    }

    // ===== Map =====
    function loadMap() {
      walls.clear();
      foods.clear();
      ghosts.clear();
      pacman = undefined;

      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < columnCount; c++) {
          const ch = tileMap[r][c];
          const x = c * tileSize;
          const y = r * tileSize;

          if (ch === 'X') walls.add(new Block(wallImage, x, y, tileSize, tileSize));
          else if (ch === 'b') ghosts.add(new Block(blueGhostImage, x, y, tileSize, tileSize));
          else if (ch === 'o') ghosts.add(new Block(orangeGhostImage, x, y, tileSize, tileSize));
          else if (ch === 'p') ghosts.add(new Block(pinkGhostImage, x, y, tileSize, tileSize));
          else if (ch === 'r') ghosts.add(new Block(redGhostImage, x, y, tileSize, tileSize));
          else if (ch === 'P') pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
          else if (ch === ' ') foods.add(new Block(null, x + 14, y + 14, 4, 4)); // pellet
        }
      }

      // set initial direction (right)
      activeDirection = 'R';
      pendingDirection = null;
      if (pacman) pacman.setVelocity(activeDirection);
    }

    // ===== Loop =====
    function startGameLoop() {
      if (running) return;
      running = true;
      lastTs = performance.now();
      requestAnimationFrame(gameLoop);
    }

    function gameLoop(ts) {
      if (gameOver) { running = false; draw(); return; }

      if (ts - lastTs >= STEP_MS) {
        move();
        lastTs = ts;
      }
      draw();
      if (running) requestAnimationFrame(gameLoop);
    }

    // ===== Draw =====
    function draw() {
      context.clearRect(0, 0, boardWidth, boardHeight);

      // 1) Walls
      for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
      }

      // 2) Food
      context.fillStyle = "yellow";
      for (let food of foods.values()) {
        context.fillRect(food.x, food.y, food.width, food.height);
      }

      // 3) Ghosts
      for (let ghost of ghosts.values()) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
      }

      // 4) Pac-Man
      if (pacman) {
        context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
      }

      // HUD
      context.fillStyle = "white";
      context.font = "24px Arial";
      const text = gameOver ? `Game Over! ${score}` : `x ${lives}  score: ${score}`;
      context.fillText(text, tileSize/2, tileSize/2);
    }

    // ===== Movement / Physics =====
    function move() {
      // ----- PAC-MAN (OG movement) -----

      // 1) Allow instant reverse at any time
      if (pendingDirection && activeDirection && isOpposite(pendingDirection, activeDirection)) {
        if (canGo(pacman, pendingDirection)) {
          activeDirection = pendingDirection;
          pendingDirection = null;
          pacman.setVelocity(activeDirection);
          updateFacingImage(pacman, activeDirection);
          if (activeDirection === 'L' || activeDirection === 'R') snapAxis(pacman, 'y');
          else snapAxis(pacman, 'x');
        }
      }

      // 2) Take queued perpendicular turn when aligned to grid on the other axis
      if (pendingDirection && canTurnNow(pacman, pendingDirection) && canGo(pacman, pendingDirection)) {
        activeDirection = pendingDirection;
        pendingDirection = null;
        pacman.setVelocity(activeDirection);
        updateFacingImage(pacman, activeDirection);
        if (activeDirection === 'L' || activeDirection === 'R') snapAxis(pacman, 'y');
        else snapAxis(pacman, 'x');
      }

      // 3) Move or stop centered if blocked
      if (activeDirection && canGo(pacman, activeDirection)) {
        pacman.x += pacman.velocityX;
        pacman.y += pacman.velocityY;
      } else {
        snapToTileCenter(pacman);
        pacman.velocityX = 0;
        pacman.velocityY = 0;
      }

      // ----- GHOSTS (wandering with intersection turns + occasional re-roll) -----
      for (let ghost of ghosts.values()) {
        // If centered on a tile, decide where to go next
        if (onGrid(ghost)) {
          let opts = validDirections(ghost);
          if (opts.length === 0) continue; // just in case

          const straightOk = ghost.direction && opts.includes(ghost.direction);
          let pool = opts;

          if (atIntersection(ghost)) {
            // Prefer non-reverse options at intersections
            const nonRev = nonReverseOptions(ghost, opts);
            const choices = (nonRev.length ? nonRev : opts);

            // If we can keep going straight, sometimes force a turn instead
            if (straightOk && Math.random() < TURN_PROB) {
              pool = choices.filter(d => d !== ghost.direction);
              if (pool.length === 0) pool = choices; // fallback
            } else {
              pool = choices;
            }
          } else {
            // Corridor / dead end: avoid reverse when possible
            const nonRev = nonReverseOptions(ghost, opts);
            pool = (nonRev.length ? nonRev : opts);
          }

          // If stopped, blocked, or current dir not allowed, pick from pool
          const moving = ghost.velocityX !== 0 || ghost.velocityY !== 0;
          if (!moving || !straightOk || !pool.includes(ghost.direction)) {
            const pick = chooseRandom(pool);
            if (pick) ghost.updateDirection(pick);
          }
        }

        // Try to advance; if blocked mid-corridor, immediately choose another valid dir
        const nextX = ghost.x + ghost.velocityX;
        const nextY = ghost.y + ghost.velocityY;
        if (!canGoRect(ghost, nextX, nextY)) {
          let opts = validDirections(ghost);
          let pool = nonReverseOptions(ghost, opts);
          if (pool.length === 0) pool = opts;
          const pick = chooseRandom(pool);
          if (pick) ghost.updateDirection(pick);
        } else {
          ghost.x = nextX;
          ghost.y = nextY;

          // Occasional mid-corridor re-roll to avoid long straight lines
          if (Math.random() < REROLL_PROB) {
            let opts = validDirections(ghost);
            let pool = nonReverseOptions(ghost, opts);
            if (pool.length === 0) pool = opts;
            const pick = chooseRandom(pool);
            if (pick) ghost.updateDirection(pick);
          }
        }

        // pacman vs ghost
        if (checkCollision(pacman, ghost)) {
          lives -= 1;
          if (lives === 0) { gameOver = true; return; }
          resetPositions();
          return; // skip rest of frame after reset
        }
      }

      // ----- FOOD -----
      let eaten = null;
      for (let food of foods.values()) {
        if (checkCollision(pacman, food)) {
          eaten = food;
          score += 10;
          break;
        }
      }
      if (eaten) foods.delete(eaten);

      // level cleared
      if (foods.size === 0) {
        loadMap();
        resetPositions();
      }
    }

    // ===== Input (queued turns) =====
    function handleKey(e) {
      if (gameOver) {
        if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"].includes(e.code)) {
          loadMap();
          resetPositions();
          score = 0;
          lives = 3;
          gameOver = false;
          startGameLoop();
        }
        return;
      }

      if (e.code === "ArrowUp" || e.code === "KeyW") {
        pendingDirection = 'U';
        updateFacingImage(pacman, 'U');
      } else if (e.code === "ArrowDown" || e.code === "KeyS") {
        pendingDirection = 'D';
        updateFacingImage(pacman, 'D');
      } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        pendingDirection = 'L';
        updateFacingImage(pacman, 'L');
      } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        pendingDirection = 'R';
        updateFacingImage(pacman, 'R');
      }
    }

    // ===== Helpers (Pac-Man feel) =====
    function gridIndex(pos) {
      return Math.round(pos / tileSize);
    }
    function tileCenterCoord(index) {
      return index * tileSize;
    }
    function isOpposite(a, b) {
      return (a === 'L' && b === 'R') || (a === 'R' && b === 'L') ||
             (a === 'U' && b === 'D') || (a === 'D' && b === 'U');
    }
    function canTurnNow(entity, dir) {
      if (dir === 'L' || dir === 'R') return (Math.round(entity.y) % tileSize) === 0;
      else return (Math.round(entity.x) % tileSize) === 0;
    }
    function snapAxis(entity, axis) {
      if (axis === 'x') entity.x = tileCenterCoord(gridIndex(entity.x));
      else entity.y = tileCenterCoord(gridIndex(entity.y));
    }
    function snapToTileCenter(entity) {
      entity.x = tileCenterCoord(gridIndex(entity.x));
      entity.y = tileCenterCoord(gridIndex(entity.y));
    }
    function canGo(entity, dir) {
      let vx = 0, vy = 0;
      if (dir === 'U') vy = -step;
      else if (dir === 'D') vy =  step;
      else if (dir === 'L') vx = -step;
      else if (dir === 'R') vx =  step;
      return canGoRect(entity, entity.x + vx, entity.y + vy);
    }
    function canGoRect(entity, nx, ny) {
      const probe = { x: nx, y: ny, width: entity.width, height: entity.height };
      for (let wall of walls.values()) if (checkCollision(probe, wall)) return false;
      if (nx < 0 || ny < 0 || nx + entity.width > boardWidth || ny + entity.height > boardHeight) return false;
      return true;
    }
    function updateFacingImage(ent, dir) {
      if (dir === 'U') ent.image = pacmanUpImage;
      else if (dir === 'D') ent.image = pacmanDownImage;
      else if (dir === 'L') ent.image = pacmanLeftImage;
      else if (dir === 'R') ent.image = pacmanRightImage;
    }

    // ===== Ghost-movement helpers =====
    function onGrid(entity) {
      return (Math.round(entity.x) % tileSize) === 0 &&
             (Math.round(entity.y) % tileSize) === 0;
    }
    function validDirections(entity) {
      return directions.filter(d => canGo(entity, d));
    }
    function nonReverseOptions(entity, opts) {
      if (!entity.direction) return opts;
      return opts.filter(d => !isOpposite(d, entity.direction));
    }
    function atIntersection(entity) {
      const opts = validDirections(entity);
      const nonRev = nonReverseOptions(entity, opts);
      return nonRev.length >= 2;
    }
    function chooseRandom(arr) {
      if (!arr || arr.length === 0) return null;
      return arr[Math.floor(Math.random() * arr.length)];
    }

    // ===== Utils =====
    function checkCollision(a, b) {
      return a.x < b.x + b.width &&
             a.x + a.width > b.x &&
             a.y < b.y + b.height &&
             a.y + a.height > b.y;
    }
    function resetPositions() {
      pacman.reset();
      activeDirection = 'R';
      pendingDirection = null;
      pacman.setVelocity(activeDirection);

      for (let ghost of ghosts.values()) {
        ghost.reset();
        const opts = validDirections(ghost);
        if (opts.length) ghost.updateDirection(chooseRandom(opts));
      }
    }

    // ===== Entity =====
    class Block {
      constructor(image, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.startX = x;
        this.startY = y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
      }

      setVelocity(direction) {
        this.direction = direction;
        if (direction === 'U') { this.velocityX = 0; this.velocityY = -step; }
        if (direction === 'D') { this.velocityX = 0; this.velocityY =  step; }
        if (direction === 'L') { this.velocityX = -step; this.velocityY = 0; }
        if (direction === 'R') { this.velocityX =  step; this.velocityY = 0; }
      }

      updateDirection(direction) {
        // ghosts (and also usable by pacman checks): only commit if the path is clear
        if (canGo(this, direction)) {
          this.setVelocity(direction);
        }
      }

      reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.direction = 'R';
      }
    }