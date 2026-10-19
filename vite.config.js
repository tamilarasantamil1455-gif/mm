import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function fileUploadPlugin() {
  return {
    name: 'vite-file-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload', (req, res, next) => {
        if (req.method === 'POST') {
          try {
            const reqUrl = new URL(req.url, 'http://localhost')
            const folder = reqUrl.searchParams.get('folder') || 'misc'
            const rawFilename = reqUrl.searchParams.get('filename') || `file_${Date.now()}`

            const ext = path.extname(rawFilename)
            const baseName = path.basename(rawFilename, ext).replace(/[^a-zA-Z0-9_-]/g, '_')
            const cleanFilename = `${baseName}_${Date.now()}${ext || '.jpg'}`

            const targetDir = path.resolve(__dirname, 'public/projects', folder)
            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true })
            }

            const targetFile = path.join(targetDir, cleanFilename)
            const writeStream = fs.createWriteStream(targetFile)

            req.pipe(writeStream)

            writeStream.on('finish', () => {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(
                JSON.stringify({
                  success: true,
                  url: `/projects/${folder}/${cleanFilename}`,
                  filename: cleanFilename,
                })
              )
            })

            writeStream.on('error', (err) => {
              console.error('File write stream error:', err)
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ success: false, error: err.message }))
            })
          } catch (err) {
            console.error('Upload handler error:', err)
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ success: false, error: err.message }))
          }
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fileUploadPlugin()],
  server: {
    watch: {
      ignored: ['**/source/**'],
    },
  },
})

