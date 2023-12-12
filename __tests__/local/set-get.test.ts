import { localStore } from '../../src'

const { __pack__ } = localStore

const configs = [
  {
    name: 'set string',
    key: new Date().getTime().toString(),
    value: 'Hello World'
  },
  {
    name: 'set number',
    key: new Date().getTime().toString(),
    value: 666
  },
  {
    name: 'set boolean',
    key: new Date().getTime().toString(),
    value: true
  },
  {
    name: 'set undefined',
    key: new Date().getTime().toString(),
    value: undefined
  },
  {
    name: 'set null',
    key: new Date().getTime().toString(),
    value: null
  },
  {
    name: 'set NaN',
    key: new Date().getTime().toString(),
    value: NaN
  },
  {
    name: 'set object',
    key: new Date().getTime().toString(),
    value: { name: 'zhangSan' }
  },
  {
    name: 'set array',
    key: new Date().getTime().toString(),
    value: [{ name: 'zhangSan' }]
  },
  {
    name: 'set Set',
    key: new Date().getTime().toString(),
    value: new Set([1, 2, 3, 4, 5, [6, 7, 8, { foo: 9 }], { bar: 10 }])
  },
  {
    name: 'set Map',
    key: new Date().getTime().toString(),
    value: new Map([
      ['foo', 'Hello world!'],
      ['foo2', 'Hello world!'],
      ['foo3', 'Hello world!'],
      ['foo4', 'Hello world!']
    ])
  },
  {
    name: 'set BigInt',
    key: new Date().getTime().toString(),
    value: 12345678901234567890123456789n
  }
]

type ItemType<T extends Array<any>> = T extends Array<infer R> ? R : any

function testHandler({ name, key, value }: ItemType<typeof configs>) {
  test(name, () => {
    localStore.set(key, value)
    const handledData = localStore.get(key)
    expect(handledData).toEqual(value)
  })
}

describe('Test set-get', () => {
  test('__pack__', () => {
    const result = JSON.stringify({ value: true, type: 'boolean' })
    expect(__pack__(true)).toBe(result)
  })

  test('no set', () => {
    const key = new Date().getTime().toString()
    const handledData = localStore.get(key)
    expect(handledData).toEqual(null)
  })

  for (const config of configs) {
    testHandler(config)
  }
})
