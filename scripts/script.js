window.onload = function(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var ballRadius = 10;
    var currentColor = "#0095DD"

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawBall(){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = currentColor;
        ctx.fill();
        ctx.closePath();
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();

        if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
            dx = -dx;
            currentColor = getRandomColor();
        }
        if(y + dy < ballRadius || y + dy > canvas.height - ballRadius){
            dy = -dy;
            currentColor = getRandomColor();
        }

        x += dx;
        y += dy;
    }

    setInterval(draw, 10);
};