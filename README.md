Node Bootcamp 
This app demonstrates using restify to create a microservice RESTful API in Node.js. 
* The API use webtokens to secure
* Shows how to decompose node apps using modules
* Use socket.io to support messaging
* More features coming later

How this project was built:
* mkdir nov11
* cd nov11
* npm init
* npm i -s restify bunyan restify-bunyan-logger restify-jwt-community jsonwebtoken socket.io delivery
* Install Jasmine globally 
* npm install -g jasmine

### JSON Web Tokens

In order to get a token, call the "/token" path with your email + password in the post body as JSON. It much match one of the accounts in users.js. 
A token will be returned. Then return that token on all calls to subsequent paths in the header as a Bearer token:

Authorization: Bearer <token>


### socket.io ###

Tester: 
* http://amritb.github.io/socketio-client-tool/#
* http://localhost:8000/


### Online References ###
* https://www.npmjs.com/package/bunyan
* https://www.npmjs.com/package/delivery 
* https://thiscouldbebetter.wordpress.com/2015/08/21/a-simple-web-server-in-node-js-with-a-mariadb-backend/
* https://www.tutorialspoint.com/socket.io/socket.io_environment.htm
* https://socket.io/get-started/chat/
* https://blog.risingstack.com/node-js-mysql-example-handling-hundred-gigabytes-of-data/
* https://mariadb.org/mariadb-non-blocking-client-api-and-node-js/
* npm install restify-jwt* https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
* https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet

