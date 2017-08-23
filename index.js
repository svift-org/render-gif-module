/*
 *
 * Add header info here
 *
 */

'use strict';

var fs = require('fs'),
  gm = require('gm')

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

    gm()
      .in(folder + '/png/*.png')
      .delay(100/30)
      .loop(1)
      .resize(500,500)
      .write(folder + '/' + name + '.gif', function(err){
        if (err) throw err;
        render_callback()
      });

  }

  return module;
 
})();

module.exports = render;