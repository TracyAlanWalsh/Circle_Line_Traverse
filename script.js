var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let x1 = 650;
let y1 = 350;
let x2 = 150;
let y2 = 650;
let cx = 200;
let cy = 200;
let t = 0; // Parameter for animation

function drawLine() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawCircleOnLine(t) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let length = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);
    let circleX = x1 + dx * t;
    let circleY = y1 + dy * t;

    if (y2 < y1) {
        angle = Math.atan2(-dy, -dx); 
        circleX = x1 + dx * (1 - t);
        circleY = y1 + dy * (1 - t);
    }

    ctx.beginPath();
    ctx.arc(circleX, circleY, 30, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function mouseLineConnect() {
    canvas.addEventListener("mousemove", function(event) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;
        x2 = mouseX;
        y2 = mouseY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLine();
        drawCircleOnLine(t);
    });
}

function animateCircle() {
    t += 0.005; // Adjust speed of animation
    if (t > 1) t = 0; // Reset parameter when animation completes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();
    drawCircleOnLine(t);
    requestAnimationFrame(animateCircle);
}

drawLine();
drawCircleOnLine(t);
mouseLineConnect();
animateCircle(); 