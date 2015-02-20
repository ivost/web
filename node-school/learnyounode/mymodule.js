module.exports = function (fpath, ext, callback) {
    var fs = require('fs')
    var path = require('path')

    fs.readdir(fpath, function (err, list) {
          if (err) {
            return callback(err) // early return
          }
        var result = []
        list.forEach(function (file) {
            if (path.extname(file) === ext) {
                //console.log(file)
                result.push(file)
            }
        })
        callback(null, result)
    })
    /*    
     */
    /*    
    var Promise = require('bluebird')
    Promise.promisifyAll(fs)
    fs.readFileAsync("program.js").then(JSON.parse).then(function (val)         {
            console.log(val.success);
        })
        .catch(SyntaxError, function (e) {
            console.error("invalid json in file");
        })
        .catch(function (e) {
            console.error("unable to read file")
        });

    */

    //var readdir_promise = Promise.convertNodeAsyncFunction(fs.readdir);
    // too complicated http://stevehanov.ca/blog/index.php?id=127
    /*    
    fs.readdir(fpath).then(function (list) {
        var result = []
        list.forEach(function (file) {
            if (path.extname(file) === ext) {
                //console.log(file)
                result.push(file)
            }
        })
        callback(null, result)
    }).catch( function (e) {
        callback(e)
    })
    */
}