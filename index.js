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

      let last = parseInt((items[items.length-1].split('.'))[0])

      for(let i = 0; i<50; i++){
        fs.copySync(folder + '/png/' + items[items.length-1], folder + '/png/' + formatName(last+i+1) + '.png');
      }

      gm()
        .in(folder + '/png/*.png')
        .delay(100/30)
        .loop(1)
        .resize(500,500)
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