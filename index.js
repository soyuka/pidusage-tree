var pidtree = require('pidtree')
var pidusage = require('pidusage')

module.exports = function (pid, cb) {
  return new Promise(function (resolve, reject) {
    pidtree(pid, {root: true}, function (err, pids) {
      if (err) {
        cb && cb(err)
        reject(err)
        return
      }

      pidusage(pids, function (err, stats) {
        if (err) {
          cb && cb(err)
          reject(err)
          return
        }

        cb && cb(null, stats)
        resolve(stats)
      })
    })
  })
}
