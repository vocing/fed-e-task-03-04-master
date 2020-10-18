const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')

const isProd = process.env.NODE_ENV === 'production'

const server = express()
server.use('/dist', express.static('./dist'))

let renderer
let onReady
if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
  })
} else {
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest,
    })
  })
}

const render = async (req, res) => {
  try {
    const html = await renderer.renderToString({
      title: '教育',
      meta: `<meta name="description" content="教育">`,
      url: req.url,
    })
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    res.end(html)
  } catch (error) {
    console.log(error)
    return res.status(500).end('Internal Server Error.')
  }
}

server.get(
  '*',
  isProd
    ? render
    : async (req, res) => {
        await onReady
        render(req, res)
      }
)
server.listen(3000, () => {
  console.log(`server running at http://localhost:3000`)
})
