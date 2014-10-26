
var interval1 = 20;
var interval2 = 50;

var ballR = 10;
var rowColors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var paddleColor = "rgba(0, 0, 200, .7)";
var ballColor = "rgba(200, 0, 0, .5)";
var backColor = "rgba(100, 220, 50, .5)";

var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var ctx;
var timer1;
var bounced;

var paddleX;
var paddleH;
var paddleW;

var rightDown;
var leftDown;

var canvasMinX;
var canvasMaxX;

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var log;

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}

function initMouse() {
    canvasMinX = $("#canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
    $(document).mousemove(onMouseMove);
}

function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddleX = evt.pageX - canvasMinX;
    }
}

function initPaddle() {
    paddleX = WIDTH / 2;
    paddleH = 10;
    paddleW = 75;
}

function initBricks() {
    NROWS = 5;
    NCOLS = 5;
    BRICKWIDTH = (WIDTH / NCOLS) - 1;
    BRICKHEIGHT = 15;
    PADDING = 1;

    bricks = new Array(NROWS);
    for (i = 0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j = 0; j < NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}


function init() {
    ctx = $('#canvas')[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    initMouse();
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);
    initPaddle();
    initBricks();
    return setInterval(draw, interval1);
}

function drawCircle(x, y, r) {
    ctx.fillStyle = ballColor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function drawPaddle() {
    //move the paddle if left or right is currently pressed
    if (rightDown) paddleX += 5;
    else if (leftDown) paddleX -= 5;
    ctx.fillStyle = paddleColor;
    rect(paddleX, HEIGHT - paddleH, paddleW, paddleH);
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function drawBricks() {
//draw bricks
    for (i = 0; i < NROWS; i++) {
        for (j = 0; j < NCOLS; j++) {
            if (bricks[i][j] == 1) {
                rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                    (i * (BRICKHEIGHT + PADDING)) + PADDING,
                    BRICKWIDTH, BRICKHEIGHT);
            }
        }
    }
}

function clear() {
    ctx.fillStyle = backColor;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function slowCheck() {
// just bounced? slow down
    if (bounced) {
        //debug("after slowdown " + interval1);
        clearInterval(timer1);
        timer1 = setInterval(draw, interval1);
        bounced = false;
    }
}

function brickCheck() {
//have we hit a brick?
    //want to learn about real collision detection? go read
    // http://www.harveycartel.org/metanet/tutorials/tutorialA.html
    rowheight = BRICKHEIGHT + PADDING;
    colwidth = BRICKWIDTH + PADDING;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    //if so, reverse the ball and mark the brick as broken
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
        //debug("hit brick");
        dy = -dy;
        bounced = true;
        bricks[row][col] = 0;
    }
}
function horizontalCheck() {
// bounce X?
    if (x + dx + ballR > WIDTH || x + dx - ballR < 0) {
        dx = -dx;
        bounced = true;
        //debug("bounce x");
    }
}
function verticalCheck() {
    if (y + dy - ballR < 0) {
        dy = -dy;
        bounced = true;
        //debug("bounce y");
    } else if (y + dy + ballR > HEIGHT - paddleH) {
        if (x > paddleX && x < paddleX + paddleW) {
            //move the ball differently based on where it hit the paddle
            dx = 8 * ((x - (paddleX + paddleW / 2)) / paddleW);
            dy = -dy;
            bounced = true;
        } else if (y + dy + ballR > HEIGHT) {
            // end of game
            clearInterval(timer1);
        }
    }
}
function slowdown() {
    if (bounced) {
        //debug("slowdown " + interval2);
        clearInterval(timer1);
        timer1 = setInterval(draw, interval2);
    }
}


function debug(msg) {
    log = $("#log");
    if (!$("#eventLogContainer") || !log) {
        alert("An event log container is required.");
        return;
    }
    //log.html(log.html() + "<li>" + msg + "</li>");
    log.append("<li>" + msg + "</li>");
}
