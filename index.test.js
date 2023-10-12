const prettier = require('prettier')

const format = (src, opt) =>
  prettier.format(
    src,
    Object.assign({ parser: 'dot-properties', plugins: ['.'] }, opt)
  )

const cases = [
  ['foo', 'foo =\n'],
  ['foo bar', 'foo = bar\n'],
  ['foo=bar', 'foo = bar\n'],
  ['foo=foo\r\nbar=bar\r\n', 'foo = foo\nbar = bar\n'],
  ['foo\\ bar baz', 'foo\\ bar = baz\n'],
  ['😀=💚', '😀 = 💚\n'],
  ['😀=💚', '\\ud83d\\ude00 = \\ud83d\\udc9a\n', { escapeNonLatin1: true }],
  ['foo=bar', 'foo: bar\n', { keySeparator: ': ' }],
  ['foo=bar', 'foo = \\\n  bar\n', { printWidth: 6 }],
  ['foo=bar', 'foo = \\\n\tbar\n', { printWidth: 6, useTabs: true }],
  ['foo=bar', '# @format\nfoo = bar\n', { insertPragma: true }],
  ['# @format\nfoo=bar', '# @format\nfoo = bar\n', { insertPragma: true }],
  [
    'foo=foo\n# prettier-ignore\nbar:bar\n',
    'foo = foo\n# prettier-ignore\nbar:bar\n'
  ],
  [
    '# prettier-ignore\nfoo.bar.sound=Lorem ipsum dolor\nfoo = bar',
    '# prettier-ignore\nfoo.bar.sound=Lorem ipsum dolor\nfoo=bar\n',
    { keySeparator: '=', printWidth: 19 }
  ],
  [
    'foo.bar=pizza hotdogs\n# prettier-ignore\nfoo.bar.sound=Lorem ipsum dolor\nfoo = bar',
    'foo.bar=pizza \\\n  hotdogs\n# prettier-ignore\nfoo.bar.sound=Lorem ipsum dolor\nfoo=bar\n',
    { keySeparator: '=', printWidth: 19 }
  ],
  [
    'foo.bar=pizza hotdogs\n# prettier-ignore\nfoo.bar.sound=hot\n# comment\nfoo = bar\n bar = bar\n',
    'foo.bar=pizza \\\n  hotdogs\n# prettier-ignore\nfoo.bar.sound=hot\n# comment\nfoo=bar\nbar=bar\n',
    { keySeparator: '=', printWidth: 19 }
  ]
]

for (const [src, exp, opt] of cases) {
  let name = src.replace(/\n/g, '\\n').replace(/\r/g, '\\r')
  if (opt) name += ` { ${Object.keys(opt)} }`
  test(name, async () => expect(await format(src, opt)).toBe(exp))
}
