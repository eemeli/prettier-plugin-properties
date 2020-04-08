const { parseLines, stringify } = require('dot-properties')
const linguist = require('linguist-languages')['Java Properties']
const { concat, hardline } = require('prettier').doc.builders

const language = {
  name: linguist.name,
  parsers: ['dot-properties'],
  tmScope: linguist.tmScope,
  aceMode: linguist.aceMode,
  codemirrorMode: linguist.codemirrorMode,
  codemirrorMimeType: linguist.codemirrorMimeType,
  aliases: ['properties'],
  extensions: linguist.extensions,
  linguistLanguageId: linguist.languageId
}

const parser = {
  parse: text => parseLines(text, true),
  astFormat: 'dot-properties',
  hasPragma: text => /^\s*[#!][ \t\f]*@(pragma|format)\b/.test(text),
  locStart(node) {
    if (Array.isArray(node)) node = node[0]
    return node.range[0]
  },
  locEnd(node) {
    if (Array.isArray(node)) node = node[node.length - 1]
    return node.range[node.range.length - 1]
  }
}

const printer = {
  print(path, options) {
    const { keySeparator, printWidth, tabWidth, useTabs } = options
    const indent = useTabs ? '\t' : ' '.repeat(tabWidth)
    const opt = { indent, keySep: keySeparator, lineWidth: printWidth }
    const node = path.getValue()
    const str = stringify(Array.isArray(node) ? node : [node], opt)
    return concat([str, hardline])
  },
  insertPragma: text => `# @format\n${text}`
}

const options = {
  keySeparator: {
    category: 'Format',
    type: 'choice',
    description: 'The separator to use between a property key and its value',
    default: ' = ',
    choices: [
      { value: ' ' },
      { value: ':' },
      { value: '=' },
      { value: ': ' },
      { value: '= ' },
      { value: ' : ' },
      { value: ' = ' }
    ]
  }
}

module.exports = {
  languages: [language],
  parsers: { 'dot-properties': parser },
  printers: { 'dot-properties': printer },
  options
}
