var psTree = require('ps-tree-ce')
var pidusage = require('pidusage')

module.exports = function (pid, cb) {
  psTree(pid, function (err, children) {
    if (err) return cb(err)

    children = children.filter(function (p) {
      return !/ps|wmic/.test(p.COMMAND.toLowerCase())
    }).map(function (p) {
      return p.PID
    })

    pidusage.stat(children, cb)
  })
}
