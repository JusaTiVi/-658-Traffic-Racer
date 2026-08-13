const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");


const bgImg = new Image();
bgImg.src = "../pictures/bg.png"; 

const carImg = new Image();
carImg.src = "../pictures/car.png";



//hitbox in background

const Bghitbox = {
    xLeft : 120,
    xRight: 590, 
    yUp:230, 
    yDown: 950,
}

//obstacle properties
const Obstaclewidth = 30;
const Obstacleheight = 30;
const obstacles = [];

//obstacle spawn point
const Obstacle = {
    y: 100,
    x: Math.random() * (canvas.width - Obstaclewidth),
}

obstacles.push(Obstacle);

//spawn point 

const player = {
    x: 350,         
    y: 600,         
    width: 100,
    height: 180
};
// speed with which go BG 
let BgSpeed = 5;
// speed with which go car 
let speed = 10;
// vertical position of the image on the screen
let bgY = 0; 


// creates an infinite background scroll (loop) using two images that alternate with each other

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bgY += BgSpeed;

    if (bgY >= canvas.height) {
        bgY = 0;  //123
    }

    ctx.drawImage(bgImg, 0, bgY, canvas.width, canvas.height);

    ctx.drawImage(bgImg, 0, bgY - canvas.height, canvas.width, canvas.height);

    ctx.drawImage(carImg, player.x, player.y, player.width, player.height);
    
}

// control 
window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && player.x > Bghitbox.xLeft) {
        player.x -= speed;
        draw();
    }

    if (event.key === "ArrowRight" && player.x < Bghitbox.xRight) { 
        player.x += speed;

        draw();
    }

    if (event.key === "ArrowUp" && player.y > Bghitbox.yUp) {
        player.y -= speed;
        draw();
    }

    if (event.key === "ArrowDown" && player.y < Bghitbox.yDown) {
        player.y += speed; 
        draw();
        
    }
    
   
    window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown") {
        BgSpeed = 3; // slows down if keydown pressed 
    }
    });

    window.addEventListener("keyup", function(event) {
        if (event.key === "ArrowDown") {
            BgSpeed = 5; // cancels
        }
    });


});

// the main loop that drives the game

function gameCycle() {

    draw(); 

    requestAnimationFrame(gameCycle);
}


gameCycle();


// I slightly stretched the image to suit different devices. XD 
// Make it so that obstacles appear once the first background has changed.
// I marked the moment with the comment "123".
// Although, you'd better just do as you see fit.