const cp = require('child_process');
const path = require('path');

cp.execFile('echo', ['hello', 'world'],
  (err, stdout, stderr) => {

    if (err) console.error(err);

    console.log('stdout', stdout);
    console.log('stderr', stderr);
  });

// here the output is buffered, but what if it is really long?

// const child = cp.spawn('ls', ['../node_modules']);
// // important to understand the difference between a method invocation and reference
// child.on('error', console.error);
// child.stdout.pipe(process.stdout);
// child.stderr.pipe(process.stderr);
//


const full = path.resolve(`../execs`);
process.env.PATH += `:${full}`;
console.log(process.env.PATH.split(':').join('\n'));

const echild = cp.spawn('node', ['../execs/example-child']);
echild.on('error', console.error);
echild.stdout.pipe(process.stdout);
echild.stderr.pipe(process.stderr);
