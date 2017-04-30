var psTree = require('ps-tree')
var pidusage = require('pidusage')
var async = require('async')

module.exports = function (pid, cb) {
  psTree(pid, function (err, children) {
    children = children.filter(function(p) {
      var command = p.COMM ? p.COMM : p.COMMAND ? p.COMMAND : null

      if (command === null) {
        return !/wmic/.test(p.Name.toLowerCase())
      }

      return !/ps/.test(command.toLowerCase())
    }).map(function (p) { return p.PID })

    async.map(children, pidusage.stat, cb)
  })
}
