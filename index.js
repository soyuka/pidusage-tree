var psTree = require('ps-tree-ce')
var pidusage = require('pidusage')

module.exports = function (pid, cb) {
  psTree(pid, function (err, children) {
    if (err) return cb(err)

    var pids = children.map(function (p) {
      return p.PID
    })

    pids.push(pid)

    pidusage.stat(pids, function (err, stats) {
      if (err) return cb(err)

      stats.forEach(function (s, i) {
        if (!s) return
        s.ppid = parseInt(children[i].PPID)
      })

      cb(null, stats)
    })
  })
}
