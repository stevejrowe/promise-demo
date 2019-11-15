// A promise can be as simple as something that immediately "resolves"
const sayHi = new Promise((resolve, reject) => {
  resolve('hi')
})

// Promises are useful though, because they allow handling content that may take time to retrieve (Asynchronous)
const wait = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ready')
  }, 1000)
})

// Most of the time, you will see functions that return promises instead of calling a promise directly
const waitAndRepeat = input => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(input)
  }, 1000)
})

// Promises may not resolve, but rather reject! Use catch blocks to handle them, or face consequences.
const echoIfString = input => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (typeof input === 'string') {
      resolve(input)
    } else {
      reject('input is not string')
    }
  }, 1000)
})

// You may not make the promise yourself, but use ones that are returned from pre-made functions or libraries.
const axios = require('axios')
const getAPI = url => axios.get(url)

// Skip this, it's for something later. 
// This function returns a promise that resolves after some amount of ms. Rejects if unspecified
const waitFor = delay => new Promise((resolve, reject) => {
  if (typeof delay !== 'number') {
    reject('delay is not a number')
  } else {
    setTimeout(() => {
      resolve(`${delay} milliseconds have passed`)
    }, delay)
  }
})

// Isn't this just a callback function with extra steps? segway: The Promise methods are the real advantage.
const waitCallback = (delay, callback) => {
  if (typeof delay !== 'number' ) {
    callback(null, 'delay is not a number')
  } else {
    setTimeout(() => {
      callback(`${delay} milliseconds have passed`, null)
    }, delay)
  }
}


module.exports = {
  sayHi,
  wait,
  waitAndRepeat,
  echoIfString,
  getAPI,
  waitCallback,
  waitFor
}