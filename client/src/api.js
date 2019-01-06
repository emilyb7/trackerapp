import Axios from 'axios'
import config from './config'

const get = url =>
  Axios.get(config().server + url, { mode: 'cors', })
    .then(res => res.data)
    .catch(err => {
      throw err
    })

const post = (url, options = {}) =>
  Axios.post(config().server + url, options)
    .then(res => res.data)
    .catch(err => {
      throw err
    })

export { get, post, }
