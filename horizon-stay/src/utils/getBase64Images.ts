import fs from 'fs'
import path from 'path'

export function getBase64Image(relativePath: string, mimeType: string): string {
  const filePath = path.join(process.cwd(), relativePath)
  const fileBuffer = fs.readFileSync(filePath)
  const base64 = fileBuffer.toString('base64')
  return `data:${mimeType};base64,${base64}`
}
