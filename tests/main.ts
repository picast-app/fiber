import 'regenerator-runtime/runtime'
import { wrap } from '../src'
import type { API } from './test.worker'

const worker = new Worker('./test.worker.ts')
const remote = wrap<API>(worker)

remote.sayHello('from main thread')
