'use strict';

document.addEventListener('DOMContentLoaded', function(){
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var x = 0
    var y = 0
    // rectangle dim
    var cw = 20;
    var ch = 100;
    // draw rectangle here
    draw_triangle(ctx)
}, false);


// draw upward pointing triangle
function draw_triangle(ctx) {
    var clr;

    clr = 'hsl(' + hue + ', 50%, ' + rnd(0, 60) + '%)';
    ctx.fillStyle = clr;
    ctx.strokeStyle = clr;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + halfSide, y + rowHeight);
    ctx.lineTo(x - halfSide, y + rowHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke(); // needed to fill antialiased gaps on edges

}

// context.translate(canvas.width / 2, canvas.height / 2);
// context.globalAlpha = 0.5;
// context.beginPath();
