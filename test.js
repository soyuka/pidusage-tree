var pidusageTree = require('./')
var child = require('child_process').exec

function getP() { return child("node -e 'while (true);'", function() {}) }

var processes = [getP(), getP(), getP()]

function doTree(cb) {
  pidusageTree(process.pid, function (err, results) {
    console.log(results)
    var l = processes.length
    processes[l - 1].kill()
    processes.length = l - 1
    cb()
  })
}

function loop() {
  doTree(function() {
    if (processes.length) {
      setTimeout(loop, 1000)
    } else {
      process.exit(0)
    }
  })
}

setTimeout(loop, 1000)
