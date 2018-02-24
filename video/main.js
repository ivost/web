'use strict';

document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var x = 0
    var y = 0

    console.log(v.textTracks)

    var trackElements = document.querySelectorAll("track");
    //var prev_coord
    trackElements[0].addEventListener('load', function() {
      var textTrack = this.track;
      textTrack.oncuechange = function() {
        var cue = this.activeCues[0];
        if(!cue) {
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // if (prev_coord) {
        //   coord = prev_coord
        // }
        var coord = JSON.parse(cue.text);
        console.log('cue updated', coord)
        draw_triangle(v, ctx, coord.a, coord.b, coord.c)
        // prev_coord = coord
      }
    })

}, false);


// draw upward pointing triangle
function draw_triangle(v, ctx, a, b, c) {
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.closePath();
    ctx.fill();
    ctx.stroke(); // needed to fill antialiased gaps on edges
}

