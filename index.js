var psTree = require('ps-tree')
var pidusage = require('pidusage')

module.exports = function (pid, cb) {
  psTree(pid, function (err, children) {
    if (err) return cb(err)

    children = children.map(function (p) {
      return p.PID
    })

    pidusage.stat(children, function(err, stats) {
      if (err) return cb(err)
      
      stats.forEach(function (s, i) {
        if (!s) return
        s.ppid = children[i].PPID
      })
      
      cb(null, stats);
    })
  })
}
