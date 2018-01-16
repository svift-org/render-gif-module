let fs = require('fs'),
  gm = require('gm'),
  im = require('imagemagick')

let start = new Date().getTime()

fs.readdir('./png', (err, items) => {
  for(let i = 0; i<0; i++){
    fs.createReadStream('./png/'+items[items.length-1]).pipe(fs.createWriteStream('./png/'+(items.length+i)+'.png'))
  }
})

console.log(new Date().getTime() - start)
start = new Date().getTime()

im.convert(['-limit', 'memory', '128mb', '-loop', '1', '-delay', '6', './png/*.png', '-delay', '300', './png/100.png', 'im_test.gif'], function (err, stdout) {
  if (err) throw err;
  console.log(new Date().getTime() - start)
});
