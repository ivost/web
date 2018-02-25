'use strict';

document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var cw = canvas.width
    var ch = canvas.height
    var midx = Math.floor(cw/2)

    var trackElements = document.querySelectorAll("track");
    console.log(v.textTracks)
    trackElements[0].addEventListener('load', function() {
      var textTrack = this.track;
      textTrack.oncuechange = function() {
        var cue = this.activeCues[0];
        console.log(cue)
        if(!cue) {
          return;
        }
        var coord = JSON.parse(cue.text);
        //console.log('coord', coord)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // for debug
        // ctx.fillStyle = 'yellow';
        // ctx.strokeStyle = 'yellow';
        // ctx.lineWidth = 3;
        // ctx.strokeRect(0, 0, cw, ch);

        draw_triangle(ctx, coord.a, coord.b, coord.c)
      }
    })

}, false);

// draw triangle defined by 3 points a, b, c
function draw_triangle(ctx, a, b, c) {
    console.log(a, b, c)
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.closePath();
    ctx.fill();
    // fill antialiased gaps on edges
    ctx.stroke(); 
}

