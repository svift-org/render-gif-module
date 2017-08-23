/*
 *
 * Add header info here
 *
 */

'use strict';

var GIFEncoder = require('gifencoder'),
  fs = require('fs'),
  //gif = require('gif'),
  PNG = require('png-js'),
  fast = require('fast-png'),
  upng = require('upng-js'),
  gm = require('gm'),
  pngparse = require('pngparse')

var render = (function () {
 
  var module = {},
    encoder,
    render_callback,
    files,
    count,
    render_folder,
    png_file,
    gmo

  /**
  * Initiate the rendering process by sending a data object containing params, vis and data (see data/example.json for structure)
  *
  * @param {Object} `data` Parameters for the rendering process.
  * @api public
  */

  module.render = function (folder, width, height, callback) {
    render_callback = callback
    render_folder = folder

    //encoder = new GIFEncoder(width, height);

    var split = folder.split('/'),
      name = split[split.length-1]

    png_file = folder + '/' + name + '.gif'

    //encoder.createReadStream().pipe(fs.createWriteStream(folder + '/' + name + '.gif'));

    //encoder.start();
    //encoder.setRepeat(-1);   // 0 for repeat, -1 for no-repeat
    //encoder.setDelay(1000/30);  // frame delay in ms
    //encoder.setQuality(1); // image quality. 10 is default.
    //encoder.setTransparent(0xFFFFFF)

    gmo = gm()
      .in(render_folder + '/png/*.png')
      .delay(100/30)
      .loop(1)
      .resize(500,500)
      .write(png_file, function(err){
        if (err) throw err;
        console.log("animated.gif created");
        render_callback()
      });

    /*count = 0
    files = fs.readdirSync(folder + '/png')

    module.addFiles()*/
  }

  module.addFiles = function(){
    if((files[count].split('.'))[1] == 'png'){
      console.log(render_folder+'/png/'+files[count])

      gmo.in(render_folder+'/png/'+files[count])
      module.nextFile()

      /*fs.readFile(render_folder+'/png/'+files[count], function(err, data){
        //png_file = new PNG(data);
        /*png_file.decode(function (pixels) {
          encoder.addFrame(pixels)
          module.nextFile()
        })
        //png_file = fast.decode(data)
        //encoder.addFrame(png_file)

        var imgObj = upng.decode(data)
        encoder.addFrame(imgObj.data)

        module.nextFile()
      })

      /*PNG.decode(render_folder+'/png/'+files[count], function(pixels){
        encoder.addFrame(pixels)
        module.nextFile()
      })*/

      /*pngparse.parseFile(render_folder+'/png/'+files[count], function(err, data) {
        if(err)
          throw err

        encoder.addFrame(data)
        module.nextFile()
      })*/

    }else{
      module.nextFile()
    }
  }

  module.nextFile = function(){
    count++
    if(count<files.length){
      module.addFiles()
    }else{
      //encoder.finish()

      gmo
        .delay(100)
        .resize(500,500)
        .write(png_file, function(err){
          if (err) throw err;
          console.log("animated.gif created");
          render_callback()
        });
    }
  }

  return module;
 
})();

module.exports = render;