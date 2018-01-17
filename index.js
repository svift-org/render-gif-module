/*
 *
 * Add header info here
 *
 */

'use strict';

var fs = require('fs-extra'),
  //im = require('imagemagick')
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

    fs.readdir(folder+'/png/', (err, items) => {

      /*im.convert(['-limit', 'memory', '128mb', '-loop', 1, '-delay', 100/30, folder+'/png/*.png', '-delay', 250, folder+'/png/'+items[items.length-1], folder + '/' + name + '.gif'], function (err, stdout) {
        if (err) throw err;
        render_callback()
      });*/

      let gif = gm()
        .in('-delay')
        .in(100/30)
        .in(folder + '/png/*.png')
        .in('-delay')
        .in(200)
        .in(folder + '/png/' + items[items.length-1])
        .loop(1)
        //.resize(500,500)
        .write(folder + '/' + name + '.gif', function(err){
          if (err) throw err;
          render_callback()
        });
    })

  }

  function formatName(n){
    return ((n<100)?'0':'')+n
  }

  return module;
 
})();

module.exports = render;