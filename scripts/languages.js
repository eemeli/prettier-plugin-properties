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
      name,
      since: '0.1.0',
      parsers: ['dot-properties'],
      ...[
        'group',
        'aliases',
        'extensions',
        'filenames',
        'interpreters',
        'tmScope',
        'aceMode',
        'codemirrorMode',
        'codemirrorMimeType',
        'linguistLanguageId',
      ].reduce(
        (acc, prop) =>
          Object.assign(acc, {
            [prop]: language[prop],
          }),
        {}
      ),
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
