const fs = require('fs')

const LinguistLanguages = require('linguist-languages')

/**
 *
 * @param {string} name
 * @returns
 */
const getSupportLanguages = (name) => {
  const language = LinguistLanguages[name]
  return [
    {
      ...language,
      name,
      since: '0.1.0',
      parsers: ['dot-properties'],
      vscodeLanguageIds: [language.aceMode],
    },
  ]
}

fs.writeFileSync(
  'languages.js',
  `exports.languages = ${JSON.stringify(
    getSupportLanguages('Java Properties'),
    null,
    2
  )}
`
)
