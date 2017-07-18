var GIFEncoder = require('gifencoder');
var fs = require('fs');
var PNG = require('png-js');

var encoder = new GIFEncoder(500, 250);
// stream the results as they are available into myanimated.gif
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

encoder.start();
encoder.setRepeat(-1);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(1000/30);  // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.

var max = 150, c = 0;

function readFile(){
  fs.readFile('../SVIFT_render-image-module@bitbucket/snap/snap_'+c+'.png', function(err, data){
    var myimage = new PNG(data);
    myimage.decode(function (pixels) {
      encoder.addFrame(pixels);
      c++;
      if(c<max){
        readFile();
      }else{
        encoder.finish();
      }
    })
  })
}

readFile()

/*var width  = myimage.width;
var height = myimage.height;


    //Pixels is a 1D array containing pixel data
});*/


