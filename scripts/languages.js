import { writeFileSync } from 'node:fs'
import { 'Java Properties' as javaProperties } from 'linguist-languages'

writeFileSync(
  'languages.js',
  `export const languages = ${JSON.stringify(
    [
      {
        ...javaProperties,
        since: '0.1.0',
        parsers: ['dot-properties'],
        vscodeLanguageIds: [javaProperties.aceMode]
      }
    ],
    null,
    2
  )}
`
)
