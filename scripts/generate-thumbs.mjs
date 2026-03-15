import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = path.resolve('public', 'imagens')
const targetDir = path.join(sourceDir, 'thumbs')
const targetWidth = Number(process.argv[2]) || 360

const supportedExtensions = new Set(['.webp', '.png', '.jpg', '.jpeg'])

const isImageFile = (fileName) => supportedExtensions.has(path.extname(fileName).toLowerCase())

const ensureThumbsDir = async () => {
  await fs.mkdir(targetDir, { recursive: true })
}

const getImageFiles = async () => {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
}

const generateThumb = async (fileName) => {
  const inputPath = path.join(sourceDir, fileName)
  const outputPath = path.join(targetDir, path.parse(fileName).name + '.webp')

  await sharp(inputPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(outputPath)
}

const run = async () => {
  await ensureThumbsDir()
  const files = await getImageFiles()

  if (files.length === 0) {
    console.log('Nenhuma imagem encontrada em', sourceDir)
    return
  }

  await Promise.all(files.map(generateThumb))
  console.log(`Thumbs geradas em ${targetDir}`)
}

run().catch((error) => {
  console.error('Erro ao gerar thumbs:', error)
  process.exit(1)
})
