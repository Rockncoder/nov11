

const failureCallback = () => {
  console.log("Hello from failureCallback");
};

const doSomething = (callback) => {
  console.log("Hello from doSomething: ");
  if(callback) callback(5);
};

const doSomethingElse = (result, callback) => {
  console.log("Hello from doSomethingElse");
  if(callback) callback(result);
};


const doSomethingMore = (result, callback) => {
  console.log("Hello from doSomethingMore");
  if(callback) callback(result);
};

// the pyramid of doom
// as more functions are nested it is increasingly harder to read
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doSomethingMore(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
