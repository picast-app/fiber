import type { λ } from 'snatchblock/types'

export const proxied = Symbol('proxied')
export const release = Symbol('release')
export const transfer = Symbol('transfer')
export const key = Symbol('key')

export type Proxied<T> = T & {
  [proxied]: number
  [release]?: () => void
  [key]: T extends λ ? [...(string | number)[], number] : (string | number)[]
}

export type FiberRequest = {
  __fid: number
  type: 'GET' | 'INV'
  path: (string | number)[]
  args?: any[]
}
export type FiberResponse = { __fid: number; data: unknown; isError?: boolean }

export type ProxyKey = { __proxy: number }

export type Wrapped<T> = T extends λ<infer TA, infer TR>
  ? (...args: ProxyArgs<TA>) => Promise<ProxyReturn<TR>>
  : Promise<T> & { [K in keyof T]: Wrapped<T[K]> }

type ProxyArgs<T extends any[]> = {
  [K in keyof T]: T[K] extends λ<infer TA, infer TR>
    ? (...args: TA) => TR extends PromiseLike<infer U> ? U | TR : TR
    : T[K]
}

type ProxyReturn<T> = T extends PromiseLike<infer I>
  ? ProxyReturn<I>
  : T extends λ<infer TA, infer TR>
  ? (...args: TA) => Promise<ProxyReturn<TR>>
  : T

export interface Endpoint {
  postMessage(message: any, transfer?: Transferable[]): void
  onmessage: λ | null
}
