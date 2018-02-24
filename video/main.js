'use strict';

document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var x = 0
    var y = 0
    // rectangle dim
    var cw = 20;
    var ch = 100;

    v.addEventListener('play', function(){
        draw(this, ctx, x, y, cw, ch);
    }, false);

}, false);

function draw(v, c, x, y, w, h) {
    if (v.paused || v.ended) {
    	return false;
    }
    c.clearRect(x, y, w, h);
    x = x + 1
    y = y + 1
    if (x > 100) {
        x = 1
        y = 1
    }
    //console.log(x, y)
    //c.fillStyle = 'rgba(100, 0, 0, 0.5)';
    c.fillStyle = 'yellow';
    c.fillRect(x, y, w, h);
    setTimeout(draw, 40, v, c, x, y, w, h);
}

// draw upward pointing triangle
function draw_triangle() {
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

//      context.translate(canvas.width / 2, canvas.height / 2);
// context.globalAlpha = 0.5;
// context.beginPath();
