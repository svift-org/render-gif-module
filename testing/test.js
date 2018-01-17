let fs = require('fs'),
  gm = require('gm'),//.subClass({imageMagick: true}),
  im = require('imagemagick')

function formatName(n){
  return ((n<100)?'0':'')+((n<10)?'0':'')+n
}

let start = new Date().getTime()

fs.readdir('./png', (err, items) => {
  for(let i = 0; i<0; i++){
    fs.createReadStream('./png/'+items[items.length-1]).pipe(fs.createWriteStream('./png/'+(items.length+i)+'.png'))
  }
})

console.log(new Date().getTime() - start)
start = new Date().getTime()

// im.convert(['-limit', 'memory', '128mb', '-loop', '1', '-delay', '6', './png/*.png', '-delay', '300', './png/100.png', 'im_test.gif'], function (err, stdout) {
//   if (err) throw err;
//   console.log(new Date().getTime() - start)
//   start = new Date().getTime()

   let gif = gm()
          .in('-delay').in(100/60)
          .in('./png/*.png')
          .in('-delay').in(100)
          .in('./png/100.png')
          .loop(1)
          //.resize(500,500)
          .write('gm_test.gif', function(err){
            if (err) throw err;
            console.log(new Date().getTime() - start)
          });

        //.in(folder + '/png/*.png')
        //.delay(100/30)
    //gif
      
//});
