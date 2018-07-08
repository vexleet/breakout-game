function draw(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    //draw rectangle
    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    //draw circle
    ctx.beginPath();
    ctx.arc(240, 160, 40, 0, Math.PI*2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(160, 10, 100, 60);
    ctx.strokeStyle = "rgba (0, 0, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();
}

window.onload = draw;