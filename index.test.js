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
  ['foo=bar', 'foo: bar\n', { keySeparator: ': ' }],
  ['foo=bar', 'foo = \\\n  bar\n', { printWidth: 6 }],
  ['foo=bar', 'foo = \\\n\tbar\n', { printWidth: 6, useTabs: true }],
  ['foo=bar', '# @format\nfoo = bar\n', { insertPragma: true }],
  ['# @format\nfoo=bar', '# @format\nfoo = bar\n', { insertPragma: true }],
  [
    'foo=foo\n# prettier-ignore\nbar:bar\n',
    'foo = foo\n# prettier-ignore\nbar:bar'
  ]
]

for (const [src, exp, opt] of cases) {
  let name = src.replace(/\n/g, '\\n').replace(/\r/g, '\\r')
  if (opt) name += ` { ${Object.keys(opt)} }`
  test(name, () => expect(format(src, opt)).toBe(exp))
}
