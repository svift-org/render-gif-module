/*
 *
 * Add header info here
 *
 */

'use strict';

var fs = require('fs'),
  im = require('imagemagick')

var render = (function () {
 
  var module = {},
    render_callback

  /**
  * Initiate the rendering process by sending a data object containing params, vis and data (see data/example.json for structure)
  *
  * @param {Object} `data` Parameters for the rendering process.
  * @api public
  */

  module.render = function (folder, width, height, callback) {
    render_callback = callback

    var split = folder.split('/'),
      name = split[split.length-1]

    fs.readdir(folder+'/png/', (err, items) => {
      //'-limit', 'memory', '128mb', 
      im.convert(['-loop', 1, '-delay', 100/30, folder+'/png/*.png', '-delay', 250, folder+'/png/'+items[items.length-1], folder + '/' + name + '.gif'], function (err, stdout) {
        if (err) throw err;
        render_callback()
      });
    })

  }

  return module;
 
})();

module.exports = render;