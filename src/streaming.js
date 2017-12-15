const http = require('http');
const fs = require('fs');

const fileName = "tales-of-space-and-time.txt";
//                  tales-of-space-and-time.txt

const readStream1 = (req, res) => {
  const rs = fs.createReadStream(fileName);
  rs.on('data', data => {
    const writeData = res.write(data);
    console.info(`buffer flushed ${writeBuffer}`);
  });
  rs.on('end', () => {
    res.end();
    console.info(`finish`);
  });
};

const readStream2 = (req, res) => {
  const rs = fs.createReadStream(fileName);
  rs.pipe(res, {end: false});
  rs.on('end', () => {
    res.write('********* We Are Done! *******');
    res.end();
  })
};


module.exports = {readStream2};