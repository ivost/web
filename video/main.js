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

    console.log(v.textTracks)
    v.addEventListener('play', function(){
      //  draw(this, ctx, x, y, cw, ch);
    }, false);
    var trackElements = document.querySelectorAll("track");
    trackElements[0].addEventListener('load', function() {
      var textTrack = this.track;
      textTrack.oncuechange = function() {
        var cue = this.activeCues[0];
        if(!cue) {
          return;
        }
        var coords = JSON.parse(cue.text);
        console.log('cue updated', coords)
        draw_triangle(v, ctx, coords.x1, coords.y1, coords.x2, coords.y2)
      }
    })

}, false);

function draw(v, c, x, y, w, h) {
    //console.log(v.textTracks[0].activeCues)
    if (v.paused || v.ended) {
    	return false;
    }
    //c.clearRect(x, y, w, h);
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
    //setTimeout(draw, 40, v, c, x, y, w, h);
}

// draw upward pointing triangle
function draw_triangle(v, ctx, x, y, halfSide, rowHeight) {
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';
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
