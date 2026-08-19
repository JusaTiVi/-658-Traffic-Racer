const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");


const bgImg = new Image();
bgImg.src = "../pictures/bg.png"; 

let carImg = new Image();
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

let Liikenneonnettomuus = false; // variable to track if a collision has occurred

//NPCs
const npcs = [];



/////////////////////////////////////from shop//////////////////////////
let openShop = false;

let buyButton = new Image();
buyButton.src = "../pictures/Shop/BUY_button.png";


let shop_Window = new Image();
shop_Window.src = "../pictures/Shop/Shopbg.png"; 

let car_2 = new Image(); 
car_2.src = "../pictures/Shop/car2.png"

let car_3 = new Image(); 
car_3.src = "../pictures/Shop/car3.png"

let car_4 = new Image(); 
car_4.src = "../pictures/Shop/car4.png"

let car_5 = new Image(); 
car_5.src = "../pictures/Shop/car5.png"


let car_6 = new Image(); 
car_6.src = "../pictures/Shop/car6.png"

let car_7 = new Image(); 
car_7.src = "../pictures/Shop/car7.png"

let num1 = 9



const buttons = [
    {
        x: 129,
        y: 620,
        width: 1080 / num1,
        height: 615 / num1,

        action: function() {
            
            carImg = car_2;
        }
    }, 
    {
        x: 270,
        y: 620,
        width: 1080 / num1,
        height: 615 / num1,

        action: function() {
            carImg = car_3;
        }
    },

    {
        x: 411,
        y: 620,
        width: 1080 / num1,
        height: 615 / num1,

        action: function() {
            carImg = car_4;
        }
    },
    {
        x: 552,
        y: 620,
        width: 1080 / num1,
        height: 615 / num1,

        action: function() {
            carImg = car_5;
        }
    },
    {
        x: 129,
        y: 900,
        width: 1080 / num1,
        height: 615 / num1,

        action: function() {
            carImg = car_6;
        }
    },

    {
        x: 270,
        y: 900,
        width: 1080 / num1,
        height: 615 / num1,

        action: function() {
            carImg = car_7;
        }
    }
];

window.addEventListener("keydown", function(event) {
    if (event.key === "b" || event.key === "B") {
        event.preventDefault();
        openShop = !openShop; 
        
        if (openShop == true){
            BgSpeed = 0;
            npcSpeed = 0; // Freeze NPCs when shop is open 
        }
        if (openShop == false && Liikenneonnettomuus == false)
        {

            BgSpeed = 5;
            npcSpeed = 3;
        }
    }
});

function Shop() {
    if (openShop) {

        ctx.drawImage(
            shop_Window,
            0,
            100,
            canvas.width,
            canvas.height / 1.4
        );

        ctx.drawImage(
            car_2,
            133,
            450,
            player.width,
            player.height
        );

        ctx.drawImage(
            car_3,
            275,
            450,
            player.width,
            player.height
        );
        ctx.drawImage(
            car_4,
            417,
            450,
            player.width,
            player.height
        );
        ctx.drawImage(
            car_5,
            559,
            450,
            player.width,
            player.height
        );

        ctx.drawImage(
            car_6,
            133,
            730,
            player.width,
            player.height
        );

        ctx.drawImage(
            car_7,
            275,
            730,
            player.width,
            player.height
        );

        buttons.forEach(button => {
            ctx.drawImage(
                buyButton,
                button.x,
                button.y,
                button.width,
                button.height
            );
        });
    }
}



canvas.addEventListener("click", function(event) {
    if (!openShop) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;

    buttons.forEach(button => {

        if (
            mouseX >= button.x &&
            mouseX <= button.x + button.width &&
            mouseY >= button.y &&
            mouseY <= button.y + button.height
        ) {
            button.action();
        }

    });

});


/////////////////////////////////////from shop//////////////////////////


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
        height: npcHeight,

    });
}

//update NPCs
function updateNPCs() {
    for (let i = npcs.length -1; i >= 0; i--) {

        npcs[i].y += npcSpeed;

        if (CollisionCheck(player, npcs[i])) {
            console.log("dead")
            speed = 0;
            BgSpeed = 0;
            npcSpeed = 0;
            Liikenneonnettomuus = true; // set the collision flag to true
        }
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
    if (openShop) return; 

    if (event.key === "ArrowLeft" && player.x > Bghitbox.xLeft) {
        player.x -= speed;
        event.preventDefault(); 
    }
    if (event.key === "ArrowRight" && player.x < Bghitbox.xRight) {
        player.x += speed;
        event.preventDefault();
    }
    if (event.key === "ArrowUp" && player.y > Bghitbox.yUp) {
        player.y -= speed;
        event.preventDefault();
    }
    if (event.key === "ArrowDown" && player.y < Bghitbox.yDown) {
        player.y += speed;
        event.preventDefault();
    }
});


window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown" && !openShop) { 
        BgSpeed = 3;
        npcSpeed = 1;
    }
});

//checks the player collision to npcs (based on distance from the object), I decided not to utilize hitboxes, though this is only reasonable because of the size of the game
function CollisionCheck(player, npc) {
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;

    const npcCenterX = npc.x + npc.width / 2;
    const npcCenterY = npc.y + npc.height /1.5;

    const distance = Math.hypot(
        playerCenterX - npcCenterX,
        playerCenterY - npcCenterY 
    )

    return distance < 80;
    
}


window.addEventListener("keyup", function(event) {
    if (event.key === "ArrowDown" && !openShop) { 
        BgSpeed = 5;
        npcSpeed = 3;
    }
});
// the main loop that drives the game

function gameCycle() {

    draw(); 
    Shop();
    requestAnimationFrame(gameCycle);
}


gameCycle();


// it is quite clunky for now, but it's a start