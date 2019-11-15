const { echoIfString } = require('./premade-promises.js')

// then blocks execute a function if the promise resolved
echoIfString('this is totally a string')
  .then(response => {
    console.log('then: ' + response)
  })

// catch blocks execute a function if the promise rejects
echoIfString(42)
  .catch(error => {
    console.log('catch: ' + error)
  })

// Then and catch methods can be chained
// demo what happens when moving the catch block
echoIfString('this is totally a string')
  .then(response => {
    console.log('first then')
    return echoIfString(42)
  })
  .then(response => {
    console.log('second then')
    return 'test'
  })
  .catch(error => {
    console.log('catch')
  })

// The finally method executes on rejection or resolve, try changing to a number
// This requires node 10
echoIfString('this is a string')
  .finally(response => {
    console.log(response)
  })