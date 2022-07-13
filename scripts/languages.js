const fs = require('fs')
const _ = require('lodash')

const LinguistLanguages = require('linguist-languages')

/**
 *
 * @param {LinguistLanguages.LinguistLanguages} languages
 * @param {'dot-properties'} parser
 * @param {string[]} aceModes
 * @returns
 */
const getSupportLanguages = (languages, parser, aceModes) =>
  Object.entries(languages).reduce((acc, [name, language]) => {
    const {
      aceMode,
      tmScope,
      codemirrorMode,
      codemirrorMimeType,
      languageId: linguistLanguageId
    } = /** @type {LinguistLanguages.Language} */ (language)
    if (!aceModes.includes(aceMode)) {
      return acc
    }
    acc.push({
      name,
      since: '0.1.0',
      parsers: [parser],
      ..._.pick(
        language,
        'group',
        'aliases',
        'extensions',
        'filenames',
        'interpreters'
      ),
      tmScope,
      aceMode,
      codemirrorMode,
      codemirrorMimeType,
      linguistLanguageId,
      vscodeLanguageIds: [aceMode]
    })
    return acc
  }, [])
fs.writeFileSync(
  'languages.js',
  `exports.languages = ${JSON.stringify(
    getSupportLanguages(LinguistLanguages, 'dot-properties', ['properties']),
    null,
    2
  )}
`
)
