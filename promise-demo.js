const axios = require('axios')

// A more real example!
// Lets make a generic wrapper for our api calls. That way we always log the same data!
const genericGetWrapper = (url, service) => {
  return axios.get(url)
    .then(result => {
      console.log(`request made to ${url}`)
      return result.data
    })
    .catch(err => {
      insertIntoLog(err, service)
      throw err
    })
}

// Our generic log function
const insertIntoLog = (err, service) => {
  // @TODO We will work out error logging eventually
  const formattedError = {
    status: err.response.status,
    message: err.response.data.message,
    url: err.config.url,
    service: service
  }
  console.log(formattedError)
}

// A common problem has been that we need to call one api to get the necessary details before calling another
// Lets lookup a github user and search wikipedia for their real name
const snoopOnUser = (req, res) => {
  const githubUrl = `https://api.github.com/users/${req.params.userName}`
  const service = 'snoopyFunction'

  genericGetWrapper(githubUrl, service)
    .then(user => {
      const wikiUrl = encodeURI(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${user.name}&namespace=0&limit=5`)
      return genericGetWrapper(wikiUrl, service)
    })
    .then(wikiResults => {
      res.send(wikiResults)
    })
    .catch(err => {
      res.send('something went wrong, the error has been logged')
    })
}

// But we wanted to get a combination of the data, so we can tell which person matches most closely for who we searched for
// Our genericGetWrapper has no way of combining the data, so what do we do?
const betterSnooper = (req, res) => {
  const githubUrl = `https://api.github.com/users/${req.params.userName}`
  const service = 'snoopyFunction-v2'

  let response = {}
  genericGetWrapper(githubUrl, service)
    .then(user => {
      response.gitInfo = user
      const wikiUrl = encodeURI(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${user.name}&namespace=0&limit=5`
      )

      return genericGetWrapper(wikiUrl, service)
    })
    .then(wikiResults => {
      response.wikiResults = wikiResults
      res.send(response)
    })
    .catch(err => {
      res.send('something went wrong, the error has been logged')
    })
}

// we could modify the genericGetWrapper to accept a transform instead of having a stateful object
const modifiedGetWrapper = (url, service, transform = x => x) => {
  return axios
    .get(url)
    .then(result => {
      console.log(`request made to ${url}`)
      return transform(result.data)
    })
    .catch(err => {
      insertIntoLog(err, service)
      throw err
    })
}

const constantSnooper = (req, res) => {
  const githubUrl = `https://api.github.com/users/${req.params.userName}`
  const service = 'snoopyFunction-v3'

  modifiedGetWrapper(githubUrl, service)
    .then(user => {
      const wikiUrl = encodeURI(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${user.name}&namespace=0&limit=5`
      )

      const transform = wikiResults => ({
        gitInfo: user,
        wikiResults: wikiResults
      })

      return modifiedGetWrapper(wikiUrl, service, transform)
    })
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send('something went wrong, the error has been logged')
    })
}

module.exports.snoopOnUser = snoopOnUser
module.exports.betterSnooper = betterSnooper
module.exports.constantSnooper = constantSnooper