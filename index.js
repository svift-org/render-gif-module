/*
 *
 * Add header info here
 *
 */

'use strict';

var GIFEncoder = require('gifencoder'),
  fs = require('fs'),
  PNG = require('png-js')

var render = (function () {
 
  var module = {},
    encoder,
    render_callback,
    files,
    count,
    render_folder

  /**
  * Initiate the rendering process by sending a data object containing params, vis and data (see data/example.json for structure)
  *
  * @param {Object} `data` Parameters for the rendering process.
  * @api public
  */

  module.render = function (folder, width, height, callback) {
    render_callback = callback
    render_folder = folder

    encoder = new GIFEncoder(width, height);

    var split = folder.split('/'),
      name = split[split.length-1]

    encoder.createReadStream().pipe(fs.createWriteStream(folder + '/' + name + '.gif'));

    encoder.start();
    encoder.setRepeat(-1);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(1000/30);  // frame delay in ms
    encoder.setQuality(1); // image quality. 10 is default.
    //encoder.setTransparent(0xFFFFFF)

    count = 0
    files = fs.readdirSync(folder + '/png')

    module.addFiles()
  }

  module.addFiles = function(){
    if((files[count].split('.'))[1] == 'png'){

      fs.readFile(render_folder+'/gif/'+files[count], function(err, data){
        var myimage = new PNG(data);
          myimage.decode(function (pixels) {
            encoder.addFrame(pixels)
            module.nextFile()
          })
      })

    }else{
      module.nextFile()
    }
  }

  module.nextFile = function(){
    count++
    if(count<files.length){
      module.addFiles()
    }else{
      encoder.finish()
      render_callback()
    }
  }

  return module;
 
})();

module.exports = render;