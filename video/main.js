var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// var textarea = document.getElementById("code");
// var reset = document.getElementById("reset");
// var edit = document.getElementById("edit");
// var code = textarea.value;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "pink";
  ctx.fillRect(10, 10, 100, 100);
  //eval(textarea.value);
}
/*
reset.addEventListener("click", function() {
  textarea.value = code;
  drawCanvas();
});

edit.addEventListener("click", function() {
  textarea.focus();
})
textarea.addEventListener("input", draw);
*/

window.addEventListener("load", draw);

