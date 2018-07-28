#!/usr/bin/env node

'use strict';
const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;

const title = argv.title || 'Default title';
const yamlFile = argv.file || './default.yaml';
const emojiFolder = argv.src || './emoji';
const diffOnly = argv.diffOnly || false;

let yaml = [];

const splitLine = line => {
  const [last] = line.split('/').reverse();
  return last;
};

const getDiffFiles = () => {
  const stdout = execSync(`git diff --name-only HEAD..HEAD~1 ${emojiFolder}`, {
    encoding: 'utf8',
  });
  return stdout
    .split('\n')
    .map(splitLine)
    .filter(Boolean);
};

fs.readdir(emojiFolder, (err, files) => {
  yaml.push(`title: ${title}\nemojis:`);
  const diffFiles = getDiffFiles();
  const filteredFiles = diffOnly
    ? files.filter(f => diffFiles.indexOf(f) !== -1)
    : files;

  filteredFiles.forEach(file => {
    if (validExtension(file)) {
      yaml.push(createItem(file));
    }
  });

  fs.writeFile(yamlFile, yaml.join(''), err => {
    if (err) throw new Error(err);
  });
});

function createItem(name) {
  return `
  - name: ${path.parse(name).name}
    src: https://raw.githubusercontent.com/guyfedwards/emoji/master/emoji/${name}`;
}

function validExtension(file) {
  const ext = path.extname(file);
  const exts = ['.jpg', '.jpeg', '.png', '.gif'];
  const matches = exts.filter(x => ext === x).length;

  if (matches !== 0) {
    return true;
  }

  return false;
}
