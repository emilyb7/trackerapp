import defaults from './defaults.json'
import production from './production.json'
import development from './development.json'
import test from './test.json'

const config = {
  production,
  development,
  test,
}

export default () => {
  const env = process.env.NODE_ENV
  return Object.assign({}, defaults, config[env])
}
