#!/usr/bin/env node

'use strict'
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)

const title = args[0] || 'Default title'
const yamlFile = args[1] || './default.yaml'
const emojiFolder = args[3] || '.'

let yaml = []

fs.readdir(emojiFolder, (err, files) => {
  yaml.push(`title: ${title}\nemojis:`)
  files.forEach(file => {
    if (validExtension(file)) {
      yaml.push(createItem(file))
    }
  })

  fs.writeFile(yamlFile, yaml.join(''))
})

function createItem(name) {
  return `
  - name: ${path.parse(name).name}
    src: https://raw.githubusercontent.com/guyfedwards/emoji/master/${name}`
}

function validExtension(file) {
  const ext = path.extname(file)
  const exts = ['.jpg', '.jpeg', '.png', '.gif']
  const matches = exts.filter(x => ext === x).length

  if (matches !== 0) {
    return true
  }

  return false
}
