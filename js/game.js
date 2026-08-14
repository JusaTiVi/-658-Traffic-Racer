const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");


const bgImg = new Image();
bgImg.src = "../pictures/bg.png"; 

let carImg = new Image();
carImg.src = "../pictures/car.png";



//hitbox in background

const Bghitbox = {
    xLeft : 120,
    xRight: 590, 
    yUp:230, 
    yDown: 950,
}



//spawn point 

const player = {
    x: 350,         
    y: 230,         
    width: 100,
    height: 180
};
// speed with wich go BG 
let BgSpeed = 5;
// speed with wich go car 
let speed = 10;
// vertical position of the image on the screen
let bgY = 0; 
// ---------------------------------------------------------------------------------------------------

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
            BgSpeed = 0 
        }
        else {
            BgSpeed = 5  //speed if change 
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




//----------------------------------------------------------------------------------------------------
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
// for debugging, so that things load one by one
 // im delet because so many images 

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
        BgSpeed = 3; // slows down if keydown presed 
    }
    });

    window.addEventListener("keyup", function(event) {
        if (event.key === "ArrowDown") {
            BgSpeed = 5; // cancels
        }
    });

    //shop
    



});

// the main loop that drives the game

function gameCycle() {

    draw(); 
    Shop(); //shop1

    requestAnimationFrame(gameCycle);
}


gameCycle();





//here shop1

// I slightly stretched the image to suit different devices. XD 
// Make it so that obstacles appear once the first background has changed.
// I marked the moment with the comment "123".
// Although, you'd better just do as you see fit.