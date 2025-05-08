// SessionStorage 适配器实现
import { StorageAdapter } from 'adapters/storage.adapter'

export class SessionAdapter extends StorageAdapter {
  constructor() {
    super(window.sessionStorage)
  }
}
