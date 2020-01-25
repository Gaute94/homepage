

$( document ).ready(function() {
    var playButton = document.getElementById("playButton");
    playButton.addEventListener("click", function() {
        var card = document.getElementById("main-card");
        card.classList.add("card-invisible");
        card.classList.remove("card");
        playGame();
    });
});


function playGame() {
     //var canvas = document.createElement('canvas');
    // canvas.id = "background-canvas";

    // canvas = this.$["background-canvas"];
    var canvas = document.querySelector('canvas');




    var ctx = canvas.getContext("2d");
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
    $(canvas).css("background-color", "#123456");

    //document.getElementById('left-single').appendChild(canvas);
    //document.body.appendChild(canvas);



    const MAX_SIZE = 10;
    const FREQUENCY = 0.02;
    const OFFSET = Math.PI;
    const MAX_X = 500;
    const MAX_Y = 400;
    const MIN_X = 50;
    const MIN_Y = 100;

    var change = 1;
    var r = 1;

    var pointArr = [];
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);

        function draw() {

            r++;

            canvas.width = $(canvas).width();
            canvas.height = $(canvas).height();
            ctx.strokeStyle = "whitesmoke";
            //ctx.globalAlpha = (Math.cos(r * FREQUENCY + OFFSET) + 1)/2;
            ctx.beginPath();
            //ctx.arc(x, y, Math.cos(r * FREQUENCY + OFFSET) * MAX_SIZE + MAX_SIZE, 0, 2 * Math.PI);
            var pos = getMousePos(canvas, evt);

            ctx.fillStyle = "#ffa000";
            //ctx.fillRect (pos.x, pos.y, 4, 4);

             ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI, true);
            // ctx.globalAlpha = 0.5;

            ctx.stroke();

            window.requestAnimationFrame(draw);

        }

    window.requestAnimationFrame(draw);
    });

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}





