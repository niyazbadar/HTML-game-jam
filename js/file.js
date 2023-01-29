let container = document.querySelector("#container");
let bot = document.querySelector("#bot");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");
let started = document.querySelector("#started");

var music = new Audio("assets/music.wav");
music.loop = true;
music.play();

var jumpSFX = new Audio("assets/jump.mp3");

var crashSFX = new Audio("assets/crash.wav");

//declaring variable for score
let interval = null;
let playerScore = 0;
let point = 1;
let active = true;

//function for score
let scoreCounter = () => {
    playerScore += point;
    score.innerHTML = `Score <b>${playerScore}</b>`;
}


//start Game
window.addEventListener("keydown", (start) => {
    //    console.log(start);
    if (start.code == "Space" && active) {
        music.play();
        crashSFX.pause();
        started.style.display = "none";
        gameOver.style.display = "none";
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 2s linear infinite";
        cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";

        active = false;

        //score
        playerScore = 0;
        point = 1;
        interval = setInterval(scoreCounter, 200);
    }
});


//jump Your Character
window.addEventListener("keydown", (e) => {
    //    console.log(e);

    if (e.key == "ArrowUp" || "Space")
        if (bot.classList != "botActive") {
            bot.classList.add("botActive");

            //                remove class after 0.5 seconds
            setTimeout(() => {
                bot.classList.remove("botActive");
            }, 500);

            jumpSFX.play();
        }
});

//'Game Over' if 'Character' hit The 'Block' 
let result = setInterval(() => {
    let botBottom = parseInt(getComputedStyle(bot).getPropertyValue("bottom"));
    //    console.log("Bottbotom" + botBottom);

    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    //    console.log("BlockLeft" + blockLeft);

    if (botBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
        //        console.log("Game Over");

        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        clearInterval(interval);

        point=0;

        active = true;

        music.pause();

        crashSFX.play();
    }
}, 10);