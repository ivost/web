document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');

    // var cw = Math.floor(canvas.clientWidth / 100);
    // var ch = Math.floor(canvas.clientHeight / 100);
    // canvas.width = cw;
    // canvas.height = ch;

    var cw = Math.floor(canvas.clientWidth / 10);
    var ch = Math.floor(canvas.clientHeight / 10);
    console.log("cw", cw, "ch", ch);
    v.addEventListener('play', function(){
        draw(this, ctx, cw, ch);
    },false);

},false);

function draw(v, c, w, h) {
    if (v.paused || v.ended) {
    	return false;
    }
	c.fillStyle = "pink";
	c.fillRect(10, 10, 100, 100);
    setTimeout(draw, 20, v, c, w, h);
}



