import {localStore} from "../../src";

const {__pack__} = localStore

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
        value: {name: 'zhangSan'}
    },
    {
        name: 'set array',
        key: new Date().getTime().toString(),
        value: [{name: 'zhangSan'}]
    },
]

type ItemType<T extends Array<any>> = T extends Array<infer R> ? R : any

function testHandler({name, key, value}: ItemType<typeof configs>) {
    test(name, () => {
        localStore.set(key, value)
        const handledData = localStore.get(key)
        expect(handledData).toEqual(value)
    })
}


describe('Test set-get', () => {

    test('__pack__', () => {
        const result = JSON.stringify({value: true, type: 'boolean'})
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

