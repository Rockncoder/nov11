const cp = require('child_process');

// cp.execFile('ls', ['../node_modules', '-al'],
//   (err, stdout, stderr) => {
//     if (err) console.error(err);
//     console.log('stdout', stdout);
//     console.log('stderr', stderr);
//   });

// here the output is buffered, but what if it is really long?

const child = cp.spawn('ls', ['../node_modules', '-al']);
// important to understand the difference between a method invocation and reference
child.on('error', console.error);
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

