window.onload = function(){
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 2;
    let dy = -2;
    let ballRadius = 10;
    let currentColor = "#0095DD";
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    let bricks = [];
    let score = 0;
    let lives = 3;

    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++){
            bricks[c][r] = {x: 0, y: 0, status: 1};
        }
    }

    function drawBricks(){
        for (let c = 0; c < brickColumnCount; c++){
            for (let r = 0; r < brickRowCount; r++){
                if(bricks[c][r].status === 1) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    
    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
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

    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if(x + dx < ballRadius || x + dx > canvas.width - ballRadius){
            dx = -dx;
            currentColor = getRandomColor();
        }
        if(y + dy < ballRadius){
            dy = -dy;
            currentColor = getRandomColor();
        }
        else if(y + dy > canvas.height - ballRadius){
            if(x > paddleX && x < paddleX + paddleWidth){
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }

        x += dx;
        y += dy;

        if(rightPressed && paddleX < canvas.width - paddleWidth){
            paddleX += 5;
        }
        if(leftPressed && paddleX > 0){
            paddleX -= 5;
        }

        requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }

    function keyDownHandler(e){
        if(e.keyCode === 39){
            rightPressed = true;
        }
        else if(e.keyCode === 37){
            leftPressed = true;
        }
    }

    function keyUpHandler(e){
        if(e.keyCode === 39){
            rightPressed = false;
        }
        else if(e.keyCode === 37){
            leftPressed = false;
        }
    }


    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++){
            for (let r = 0; r < brickRowCount; r++){
                var b = bricks[c][r];
                if(b.status === 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount*brickColumnCount){
                            alert("CONGRATS YOU WON");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    function drawScore(){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095dd";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

    draw();
};