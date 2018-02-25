'use strict';

document.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var cw = canvas.width
    var ch = canvas.height
    var midx = Math.floor(cw/2)

    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, cw, ch);

    var a = [midx,  20];
    var b = [midx-100, 600];
    var c = [midx+100, 600];
    draw_triangle(ctx, a, b, c)
}, false);


// draw triangle defined by 3 points a, b, c
function draw_triangle(ctx, a, b, c) {
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';
    console.log(a, b, c)
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke(); // needed to fill antialiased gaps on edges
}

// context.translate(canvas.width / 2, canvas.height / 2);
// context.globalAlpha = 0.5;
// context.beginPath();
