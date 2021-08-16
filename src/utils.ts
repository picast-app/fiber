import { FiberRequest, FiberResponse } from './wellKnown'
import type { λ } from 'snatchblock/types'

export const genId = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)

export const isFiberMsg = (msg: unknown): msg is FiberRequest | FiberResponse =>
  !!msg && typeof msg === 'object' && '__fid' in msg!

export const isError = (
  v: unknown,
  b?: boolean
): v is Pick<Error, 'message' | 'name' | 'stack'> => !!b

export const select = (node: any, path: (string | number)[]): any =>
  !path.length ? node : select(node[path[0]], path.slice(1))

export const bound = <T, K extends FilterKeys<T, λ>>(obj: T, method: K): T[K] =>
  (obj[method] as any).bind(obj)

export const mapValues = <T extends Record<string | number, any>, R>(
  o: T,
  func: <K extends keyof T>(v: typeof o[K], k: K) => R
): { [K in keyof T]: R } =>
  Object.fromEntries(
    Object.entries(o).map(([k, v]) => [k, func(v, k as keyof T)])
  ) as any

export const pick = <T extends Record<string | number, any>, K extends keyof T>(
  v: T,
  ...keys: K[]
): Pick<T, K> =>
  Object.fromEntries(keys.filter(k => k in v).map(k => [k, v[k]])) as any

type FilterKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T]
