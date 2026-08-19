import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../src/App.jsx'

// Runs after `vite build`. Renders the real component tree to HTML and
// injects it into dist/index.html, so crawlers, link-preview bots and
// anyone with JS disabled get real content on the first response instead
// of an empty <div id="root"></div>. React hydrates over this on the
// client (see src/main.jsx), so behavior for real visitors is unchanged.

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const distIndexPath = path.join(scriptDir, '..', 'dist', 'index.html')

const appHtml = renderToString(React.createElement(App))

const template = readFileSync(distIndexPath, 'utf8')
const injected = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
)

if (injected === template) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html')
}

writeFileSync(distIndexPath, injected)
console.log(`prerender: injected ${appHtml.length} chars of static HTML into dist/index.html`)
