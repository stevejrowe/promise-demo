const { waitCallback, waitFor } = require('./premade-promises.js') 

// Why promises over callbacks?
// Suppose we wanted to make successive calls, but only if each one is successful.
// (intentionally written in an extreme way)
waitCallback(100, (result, err) => {
  console.log(result)
  if (!err) {
    waitCallback('it will not like this string', (result, err) => {
      if (!err) {
        console.log(result)
        waitCallback(300, (result, err) => {
          if (!err) {
            console.log(result)
          } else {
            console.log(err)
          }
        })
      } else {
        console.log(err)
      }
    })
  } else {
    console.log(err)
  }
})

// The methods!
waitFor(100)
  .then(result => {
    console.log(result)
    return waitFor('it will not like this string')
  })
  .then(result => {
    console.log(result)
    return waitFor(300)
  })
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  })

// What about that async/await stuff?
const asyncFunction = async () => {
  try {
    const first = await waitFor(100)
    console.log(first)
    const second = await waitFor('it will not like this string')
    console.log(second)
    const third = await waitFor(300)
    console.log(third)
  } catch(e) {
    console.log(e)
    return null
  }  
} 

asyncFunction()