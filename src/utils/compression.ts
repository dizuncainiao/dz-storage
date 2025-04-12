import { deflate, inflate } from 'pako'

export function compress(data: string): string {
  try {
    const compressed = deflate(new TextEncoder().encode(data))
    return btoa(String.fromCharCode.apply(null, Array.from(compressed)))
  } catch (error) {
    console.error('Compression failed:', error)
    return data
  }
}

export function decompress(data: string): string {
  try {
    const binary = new Uint8Array(atob(data).split('').map(char => char.charCodeAt(0)))
    const decompressed = inflate(binary)
    return new TextDecoder().decode(decompressed)
  } catch (error) {
    console.error('Decompression failed:', error)
    return data
  }
} 