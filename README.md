# promise-demo
Short presentation for standards and practices meeting

1. `premade-promises.js` provides an introduction to what promises are.
2. `promise-methods.js` shows the then, catch, and finally methods.
3. `promise-composition.js` is a simple editable example of the all, race, and allSettled methods.
4. `promise-demo.js` shows a more realistic example of how promises are used with a node.js api.

Edit the files to comment out sections that you don't want to run, or call functions you want to demonstrate. 

# Setup
1. Run `npm install` to install axios and express
2. Run `node app.js` to start an express server on `localhost:3000`
3. Curl or navigate to `localhost:3000/api/v1/:githubUserName` to show the result of the promises.
