import 'regenerator-runtime/runtime'
import { expose } from '../src'

const api = {
  sayHello(msg: string) {
    console.assert(this === api)
    console.log('hello', msg)
  },
  foo: {
    bar: {
      baz() {
        console.assert(this === api.foo.bar)
      },
    },
  },
  getCB() {
    return (msg: string) => {
      console.log(msg)
    }
  },
}
export type API = typeof api

expose(api)
