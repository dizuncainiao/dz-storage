// MemoryStorage 适配器实现
export class MemoryAdapter {
  private store: Record<string, string> = {}
  set(key: string, value: string) {
    this.store[key] = value
  }
  get(key: string): string | null {
    return this.store.hasOwnProperty(key) ? this.store[key] : null
  }
  remove(key: string) {
    delete this.store[key]
  }
  clear() {
    this.store = {}
  }
}
