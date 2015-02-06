module.exports = function(fpath, ext, callback) {
    var fs = require('fs')
    var path = require('path')
    fs.readdir(fpath, function (err, list) {
      if (err) {
        return callback(err) // early return
      }
      /*    
        result = list
      */
      var result = []    
      list.forEach(function(file) {
          if (path.extname(file) === ext) {
              //console.log(file)
                result.push(file)
          }
      })
      callback(null, result)
    })
}
