// LocalStorage 适配器实现
import { StorageAdapter } from 'adapters/storage.adapter'

export class LocalAdapter extends StorageAdapter {
  constructor() {
    super(window.localStorage)
  }
}
