import {localStore} from "../../src";

const {__pack__} = localStore

test('Test localStore set string', () => {
    const key = new Date().getTime().toString()
    const value = 'Hello World'

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore set number', () => {
    const key = new Date().getTime().toString()
    const value = 666

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore set boolean', () => {
    const key = new Date().getTime().toString()
    const value = true

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore set undefined', () => {
    const key = new Date().getTime().toString()
    const value = undefined

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore set null', () => {
    const key = new Date().getTime().toString()
    const value = null

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore set NaN', () => {
    const key = new Date().getTime().toString()
    const value = NaN

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore set object', () => {
    const key = new Date().getTime().toString()
    const value = {name: 'zhangsan'}

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore set array', () => {
    const key = new Date().getTime().toString()
    const value = [{name: 'zhangsan'}]

    localStore.set(key, value)

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(__pack__(value))

    expect(handledData).toEqual(value)
})

test('Test localStore only get', () => {
    const key = new Date().getTime().toString()

    const vanillaData = localStorage.getItem(key)

    const handledData = localStore.get(key)

    expect(vanillaData).toEqual(null)

    expect(handledData).toEqual(null)
})
