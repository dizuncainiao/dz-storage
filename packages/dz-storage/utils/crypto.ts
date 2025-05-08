// 简单加密解密工具函数
export function encrypt(text: string, key: string): string {
  // 这里只做简单的 base64 处理，实际可替换为更安全算法
  return btoa(unescape(encodeURIComponent(text + key)))
}

export function decrypt(cipher: string, key: string): string {
  try {
    const decoded = decodeURIComponent(escape(atob(cipher)))
    return decoded.replace(key, '')
  } catch {
    return ''
  }
}
