

$( document ).ready(function() {
    const playButton = document.getElementById("playButton");
    playButton.addEventListener("click", function() {
        const card = document.getElementById("main-card");
        card.classList.add("card-invisible");
        card.classList.remove("card");
        playGame();
    });
});

// To scroll down on button click
//
// $( document ).ready(function() {
//
//     const scrollButton = document.getElementById("scrollButton");
//     scrollButton.addEventListener("click", function(){
//         window.scrollTo(0,3000);
//     });
// });

function playGame() {
     //var canvas = document.createElement('canvas');
    // canvas.id = "background-canvas";

    // canvas = this.$["background-canvas"];
    const canvas = document.querySelector('canvas');




    const ctx = canvas.getContext("2d");
    canvas.classList.remove("game-canvas");
    canvas.classList.add("game-canvas-on");
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.style.cursor = "none";

    canvas.width = $(canvas).width();
    canvas.height = $(canvas).height();
    // ...then set the internal size to match
    // canvas.width  = canvas.offsetWidth;
    // canvas.height = canvas.offsetHeight;
    $(canvas).css("position", "relative");
    $(canvas).css("top", "0");
    $(canvas).css("left", "0");
    $(canvas).css("z-index", "2");
    $(canvas).css("background-color", "#121212");

    //document.getElementById('left-single').appendChild(canvas);
    //document.body.appendChild(canvas);



    const MAX_SIZE = 10;
    const FREQUENCY = 0.02;
    const OFFSET = Math.PI;
    const MAX_X = 500;
    const MAX_Y = 400;
    const MIN_X = 50;
    const MIN_Y = 100;

    const change = 1;

    var posX = Math.floor(Math.random() * canvas.width);
    var posY = Math.floor(Math.random() * canvas.height);
    var newPoint = true;
    var r = 1;

    var mouseX = 0;
    var mouseY = 0;
    var rad = 5;

    var point;
    var pointRad = 7;
    var enemyArr = [];
    var enemyPosX = 0;
    var enemyPosY = 0;
    var maxSpeed = 1;
    var enemyCount = 15;

    var gamePaused = false;

    var score = 0;
    var scoreMultiplier = 1;


    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
    });

    function generateEnemyPos(){
        var rand = Math.floor(Math.random() * 4) + 1;
        switch(rand){
            case 1: setEnemyPos(0, (Math.floor((Math.random()) * canvas.height)));
                break;
            case 2: setEnemyPos((Math.floor(((Math.random()) * canvas.width))), 0);
                break;
            case 3: setEnemyPos(canvas.width, (Math.floor((Math.random()) * canvas.height)));
                break;
            case 4: setEnemyPos(Math.floor((Math.random()) * canvas.width), canvas.height);
                break;
        }
    }

    function setEnemyPos(newPosX, newPosY){
        enemyPosX = newPosX;
        enemyPosY = newPosY;
    }

        function draw() {

            canvas.width = $(canvas).width();
            canvas.height = $(canvas).height();
            ctx.strokeStyle = "whitesmoke";
            //ctx.globalAlpha = (Math.cos(r * FREQUENCY + OFFSET) + 1)/2;
            ctx.beginPath();
            //ctx.arc(x, y, Math.cos(r * FREQUENCY + OFFSET) * MAX_SIZE + MAX_SIZE, 0, 2 * Math.PI);
            //var pos = getMousePos(canvas, evt);

            ctx.fillStyle = "#ffa000";
            //ctx.fillRect (pos.x, pos.y, 4, 4);

             ctx.arc(mouseX, mouseY, rad, 0, 2 * Math.PI, true);
            // ctx.globalAlpha = 0.5;

            ctx.stroke();
            var scoreStr = "Score: " + score + " x" + scoreMultiplier;
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(scoreStr, (canvas.width)/2, 20);
            if(!gamePaused) {
                score += scoreMultiplier;
                if (newPoint) {
                    point = createNewPoint(ctx, posX, posY);
                }

                if ((mouseX < (posX + pointRad) && (mouseX > posX - pointRad) && (mouseY < posY + pointRad) && (mouseY > posY - pointRad))) {
                    posX = Math.floor(Math.random() * canvas.width);
                    posY = Math.floor(Math.random() * canvas.height);
                    rad += 5;
                    pointRad += 5;
                    score += 525 * scoreMultiplier;
                    scoreMultiplier += 1;
                    enemyCount++;
                }
            }


            if(enemyArr.length < enemyCount){
                generateEnemyPos();
                var newEnemy = new Enemy(enemyPosX, enemyPosY, generateSpeed(maxSpeed), generateSpeed(maxSpeed));
                enemyArr.push(newEnemy);
            }

            for(var i = 0; i < enemyArr.length; i++){
                var enemy = enemyArr[i];
                if(!gamePaused) {
                    if(enemy.posX < 0 || enemy.posX > canvas.width || enemy.posY < 0 || enemy.posY > canvas.height){
                        generateEnemyPos();
                        enemyArr[i] = new Enemy(enemyPosX, enemyPosY, generateSpeed(maxSpeed), generateSpeed(maxSpeed));
                    }

                    enemy.posX += enemy.horizontalSpeed;
                    enemy.posY += enemy.verticalSpeed;

                    if ((mouseX < (enemy.posX + pointRad) && (mouseX > enemy.posX - pointRad) && (mouseY < enemy.posY + pointRad) && (mouseY > enemy.posY - pointRad))) {
                        rad -= 5;
                        pointRad -= 5;
                        scoreMultiplier -= 1;
                    }
                }

                drawEnemies(ctx, enemy.posX, enemy.posY);
            }

            if(rad < 5){
                gamePaused = true;
                rad = 2;
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Game Over!", (canvas.width)/2, (canvas.height)/2);
            }
            window.requestAnimationFrame(draw);

        }

    window.requestAnimationFrame(draw);
}

function generateSpeed(maxSpeed){
    if(Math.floor(Math.random() * 10) < 5){
        return Math.random() * maxSpeed + 1;
    }else{
        return -(Math.ceil(Math.random() * maxSpeed) + 1);
    }
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function createNewPoint(ctx, posX, posY){
    ctx.beginPath();
    ctx.strokeStyle = "#ffa000";
    ctx.fillStyle = "#ffa000";
    ctx.arc(posX, posY, 5, 0, 2 * Math.PI, true);
    ctx.fill();
}

function drawEnemies(ctx, posX, posY){
    ctx.beginPath();
    ctx.strokeStyle = "#aa0000";
    ctx.fillStyle = "#aa0000";
    ctx.arc(posX, posY, 5, 0, 2 * Math.PI, true);
    ctx.fill();
}


class Enemy{
    constructor(posX, posY, horizontalSpeed, verticalSpeed){
        this.posX = posX;
        this.posY = posY;
        this.horizontalSpeed = horizontalSpeed;
        this.verticalSpeed = verticalSpeed;
    }
}









