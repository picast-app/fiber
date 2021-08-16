import 'regenerator-runtime/runtime'
import { expose } from '../src'

const api = {
  sayHello(msg: string) {
    console.log('hello', msg)
  },
}
export type API = typeof api

expose(api)
