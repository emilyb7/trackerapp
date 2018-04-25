import Axios from 'axios'
import config from './config/defaults'

const get = url =>
  Axios.get(config.server + url)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
      Promise.reject('error in fetch')
    })

const post = (url, options = {}) =>
  Axios.post(config.server + url, options)
    .then(res => res.data)
    .catch(Promise.reject)

export { get, post, }
