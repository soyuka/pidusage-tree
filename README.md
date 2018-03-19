pidusage-tree
=============

Combination of [pidusage](https://github.com/soyuka/pidusage) and [pidtree](https://github.com/simonepri/pidtree)

## Installation

```
npm install pidusage-tree --save
```

## Usage

```
var pidusageTree = require('pidusage-tree')

pidusageTree(process.pid, function(err, results) {

})

// or as a promise

var stats = await pidusageTree(process.pid)
```
