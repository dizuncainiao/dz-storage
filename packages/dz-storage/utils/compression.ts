// 简单压缩与解压工具函数（示例实现，实际可用第三方库替换）
export function compress(str: string): string {
  // 这里只做简单的 base64 处理，实际可用 gzip/lz-string 等
  return btoa(unescape(encodeURIComponent(str)))
}

export function decompress(compressed: string): string {
  try {
    return decodeURIComponent(escape(atob(compressed)))
  } catch {
    return ''
  }
}
