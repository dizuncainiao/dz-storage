import CryptoJS from 'crypto-js'

const SECRET_KEY = 'dz-storage-secret-key' // 建议使用环境变量存储

export function encrypt(data: string): string {
  try {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
  } catch (error) {
    console.error('Encryption failed:', error)
    return data
  }
}

export function decrypt(data: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Decryption failed:', error)
    return data
  }
} 