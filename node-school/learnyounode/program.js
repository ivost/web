/* STEP 2 - sum of arguments
var result = 0
for (var i = 2; i < process.argv.length; i++)
  result += Number(process.argv[i])
console.log(result)
*/
/* STEP 3 - count lines in a file
var fs = require('fs')
var fpath = process.argv[2];
//fpath = '/etc/hosts'; 
var data = fs.readFileSync(fpath, 'utf8');
//console.log(data);
var lines = data.split('\n');
console.log(lines.length-1);
*/

/* STEP 4 - count lines in a file, async I/O
var fs = require('fs');
var fpath = process.argv[2];
fs.readFile(fpath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var lines = data.split('\n');
  console.log(lines.length-1);
});
*/

/* STEP 5 - list files in a dir with given extension
var fs = require('fs')
var path = require('path')
var fpath = process.argv[2]
var ext = '.' + process.argv[3]
fs.readdir(fpath, function (err, list) {
  if (err) {
    return console.log(err)
  }
  list.forEach(function(file) {
      if (path.extname(file) === ext) {
          console.log(file);
      }
  })
})
*/
var mymodule = require('./mymodule.js')
var fpath = process.argv[2]
var ext = '.' + process.argv[3]
mymodule(fpath, ext, function(err, list) {
  list.forEach(function(file) {
    console.log(file);
  })
})
