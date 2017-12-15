const fetch = require('node-fetch');
// npm i S node-fetch
const GOOD_URL = 'http://jsonplaceholder.typicode.com/posts/1';
const BAD_URL = 'http://jsonplaceholder.typicodeXXXXX.com/posts/1';


// why not use http? it doesn't support promises

// http://node.green/
// http://jsonplaceholder.typicode.com/

async function fetchItOld(url) {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (e) {
    return await Promise.reject(e);
  }
}

const fetchIt = async (url) => {
  try {
    const data = await fetch(url);
    return await(data.json());
  } catch (e) {
    return await Promise.reject(e);
  }
};


// KEEP Mind that Node waits until all processes finish before exiting

fetchIt(GOOD_URL)
  .then(data => {
    console.log(data);
  }, error => {
    console.error(error);
  });
