import 'regenerator-runtime/runtime'
import { wrap } from '../src'
import type { API } from './test.worker'

main()
async function main() {
  const worker = new Worker('./test.worker.ts')
  const remote = wrap<API>(worker)

  await remote.sayHello('from main thread')
  await remote.sayHello.apply(remote, ['again'])
  await remote.foo.bar.baz()
  await remote.foo.bar.baz.apply(remote.foo.bar)

  await (
    await remote.getCB()
  )('hello')

  const cb = await remote.getCB()
  await cb.apply(cb, ['hello'])
}
