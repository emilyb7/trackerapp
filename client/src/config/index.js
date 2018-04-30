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
  const NODE_ENV = process.env.NODE_ENV
  const env = process.env
  return Object.assign({}, defaults, config[NODE_ENV], env)
}
