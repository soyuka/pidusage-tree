var psTree = require('ps-tree')
var pidusage = require('pidusage')
var async = require('async')

module.exports = function (pid, cb) {
  psTree(pid, function (err, children) {
    children = children.filter(function(p) {
      return !/ps|wmic/.test(p.COMMAND.toLowerCase())
    })

    async.map(children, function(proc, cb) {
      pidusage.stat(proc.PID, function(err, data) {
        if (err) {
          return cb(err)
        }

        data.process = proc
        return cb(null, data)
      })
    }, cb)
  })
}
