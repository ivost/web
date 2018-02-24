document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var x = 0
    var y = 0

    var cw = 20;
    var ch = 100;

    //console.log("cw", cw, "ch", ch);
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
    //c.fillStyle = 'rgba(100, 0, 0, 0.5)';
    c.fillStyle = 'pink';
    c.fillRect(x, y, w, h);
    setTimeout(draw, 50, v, c, x, y, w, h);
}



