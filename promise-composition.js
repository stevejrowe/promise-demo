const { waitFor } = require('./premade-promises.js')

// The all method is used if we don't want to write a long chain of promises, but instead call them all at once
// edit this example to see how allSettled (node 13) and race behave. Then demonstrate errors with waitFor()
Promise.all([
  waitFor(1),
  waitFor(2000)
])
  .then(response => {
    console.log('then')
    console.log(response)
  })
  .catch(error => {
    console.log('catch')
    console.log(error)
  })