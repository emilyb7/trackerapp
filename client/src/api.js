import Axios from 'axios'
import config from './config/defaults'

const get = url =>
  Axios.get(config.server + url)
    .then(res => res.data)
    .catch(err => {
      throw err
    })

const post = (url, options = {}) =>
  Axios.post(config.server + url, options)
    .then(res => res.data)
    .catch(err => {
      throw err
    })

export { get, post, }
