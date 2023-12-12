import { localStore } from '../../src'

describe('Test remove-clear-length-key', () => {
  localStore.set('foo', 1)
  localStore.set('foo2', 2)
  localStore.set('foo3', 3)
  localStore.setItem('foo4', 4)

  test('length', () => {
    expect(localStore.length).toBe(4)
  })

  test('key', () => {
    expect(localStore.key(0)).toBe('foo')
  })

  test('remove', () => {
    localStore.remove('foo')
    expect(localStore.getItem('foo')).toBe(null)
    expect(localStore.key(0)).toBe('foo2')
    expect(localStore.length).toBe(3)
    localStore.removeItem('foo4')
    expect(localStore.getItem('foo4')).toBe(null)
    expect(localStore.length).toBe(2)
  })

  test('clear', () => {
    localStore.clear()
    expect(localStore.get('foo')).toBe(null)
    expect(localStore.get('foo2')).toBe(null)
    expect(localStore.get('foo3')).toBe(null)
    expect(localStore.key(0)).toBe(null)
    expect(localStore.length).toBe(0)
  })
})
