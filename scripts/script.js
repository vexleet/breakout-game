window.onload = function(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var ballRadius = 10;

    function drawBall(){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        x += dx;
        y += dy;
        if(x + dx < 0 || x + dx > canvas.width - ballRadius){
            dx = -dx;
        }
        if(y + dy < 0 || y + dy > canvas.height - ballRadius){
            dy = -dy;
        }
    }

    setInterval(draw, 10);
};