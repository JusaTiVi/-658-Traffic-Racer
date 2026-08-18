const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");


const bgImg = new Image();
bgImg.src = "../pictures/bg.png"; 

const carImg = new Image();
carImg.src = "../pictures/car.png";

const npcImg = new Image();
npcImg.src = "../pictures/grayCar.png";


//hitbox in background

const Bghitbox = {
    xLeft : 120,
    xRight: 590, 
    yUp:230, 
    yDown: 950,
}

//obstacle properties (currently obsolete)
//const Obstaclewidth = 30;
//const Obstacleheight = 30;
//const obstacles = [];

//obstacle spawn point
//const Obstacle = {
//    x: Math.random() * (canvas.width - Obstaclewidth),
//    y: 50,}

//obstacles.push(Obstacle);


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
// NPCs movement speed
let npcSpeed = 3;
// vertical position of the image on the screen
let bgY = 0; 

//how far the road has travelled
let distance = 0;

//NPCs spawn after one background screen
const spawnStartDistance = canvas.height;

//distance travelled for next NPC spawn
let nextSpawn = spawnStartDistance;

//NPCs
const npcs = [];

function spawnNPC() {
    const npcWidth = 100;
    const npcHeight = 180;

    const minX = Bghitbox.xLeft;
    const maxX = Bghitbox.xRight - npcWidth;
    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;

    npcs.push({
        x: randomX,
        y: -npcHeight,
        width:npcWidth,
        height: npcHeight
    });
}

//update NPCs
function updateNPCs() {
    for (let i = npcs.length -1; i >= 0; i--) {

        npcs[i].y += npcSpeed;

        //remove offscreen NPCs
        if (npcs[i].y > canvas.height) {
            npcs.splice(i, 1)
        }
    }
}
// creates an infinite background scroll (loop) using two images that alternate with each other

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //bgY resets, distance doesn't, I seperated the two just in case you want to make mechanics that react with how far you are in the game
    bgY += BgSpeed;

    distance += BgSpeed;

    if (bgY >= canvas.height) {
        bgY = 0;
    }

    ctx.drawImage(bgImg, 0, bgY, canvas.width, canvas.height);

    ctx.drawImage(bgImg, 0, bgY - canvas.height, canvas.width, canvas.height);

    ctx.drawImage(carImg, player.x, player.y, player.width, player.height);
    
    

    //NPC spawning

    if (distance >= nextSpawn) {
        spawnNPC();

        //decides how much distance is needed for the next npc to spawm
        nextSpawn += 500 + Math.random() * 400;
    }

    updateNPCs();

    for (const npc of npcs) {
        ctx.drawImage(npcImg, npc.x, npc.y, npc.width, npc.height);
    }
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
        npcSpeed = 1;
    }
    });

window.addEventListener("keyup", function(event) {
    if (event.key === "ArrowDown") {
            BgSpeed = 5; // cancels
            npcSpeed = 3;
    }
    });


});

// the main loop that drives the game

function gameCycle() {

    draw(); 

    requestAnimationFrame(gameCycle);
}


gameCycle();


// it is quite clunky for now, but it's a start